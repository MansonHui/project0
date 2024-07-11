// src/WebcamCapture.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as faceDetection from "@tensorflow-models/face-detection";
import "@tensorflow/tfjs-backend-webgl";
import { captureAttendanceImage } from "../../api/attendanceCaptureImageAPI";

const BLUR_THRESHOLD_LAPLACIAN = 100; // Adjusted threshold for Laplacian variance method
const BLUR_THRESHOLD_TENENGRAD = 2000; // Threshold for Tenengrad method
const MIN_BOX_SIZE = 180; // Minimum size for the bounding box to consider the face clear
const IMG_SIZE = 410;
const videoConstraints = {
  width: IMG_SIZE,
  height: IMG_SIZE,
  facingMode: "user",
};

declare global {
  interface Window {
    cv: any;
  }
}

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detector, setDetector] = useState<faceDetection.FaceDetector | null>(
    null
  );
  const [isCapturing, setIsCapturing] = useState<boolean>(true);
  const [cvLoaded, setCvLoaded] = useState<boolean>(false);
  const [isImageClear, setIsImageClear] = useState<boolean>(false);
  const [displayMsg, setDisplayMsg] = useState("smile");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load model only once
  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      const model = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        {
          runtime: "tfjs",
          modelType: "short",
          maxFaces: 1,
        }
      );
      setDetector(model);
    };

    loadModel();
  }, []);

  // Ensure OpenCV.js is loaded
  useEffect(() => {
    const checkOpenCV = setInterval(() => {
      if (window.cv) {
        setCvLoaded(true);
        clearInterval(checkOpenCV);
      }
    }, 100);

    return () => clearInterval(checkOpenCV);
  }, []);

  // Function to detect blurriness using Laplacian variance method
  const isBlurryLaplacian = useCallback((image: HTMLImageElement): boolean => {
    if (!window.cv) return true; // If OpenCV is not loaded, assume image is blurry

    const mat = window.cv.imread(image);
    const grayMat = new window.cv.Mat();
    window.cv.cvtColor(mat, grayMat, window.cv.COLOR_RGBA2GRAY);
    const laplacianMat = new window.cv.Mat();
    window.cv.Laplacian(grayMat, laplacianMat, window.cv.CV_64F);
    const mean = new window.cv.Mat();
    const stddev = new window.cv.Mat();
    window.cv.meanStdDev(laplacianMat, mean, stddev);
    const variance = Math.pow(stddev.data64F[0], 2);
    mat.delete();
    grayMat.delete();
    laplacianMat.delete();
    mean.delete();
    stddev.delete();

    // console.log(`Laplacian Variance: ${variance}`); // Log variance for tuning
    return variance < BLUR_THRESHOLD_LAPLACIAN;
  }, []);

  // Function to detect blurriness using Tenengrad method
  const isBlurryTenengrad = useCallback((image: HTMLImageElement): boolean => {
    if (!window.cv) return true; // If OpenCV is not loaded, assume image is blurry

    const mat = window.cv.imread(image);
    const grayMat = new window.cv.Mat();
    window.cv.cvtColor(mat, grayMat, window.cv.COLOR_RGBA2GRAY);
    const sobelX = new window.cv.Mat();
    const sobelY = new window.cv.Mat();
    window.cv.Sobel(grayMat, sobelX, window.cv.CV_64F, 1, 0);
    window.cv.Sobel(grayMat, sobelY, window.cv.CV_64F, 0, 1);
    const sobelMat = new window.cv.Mat();
    window.cv.magnitude(sobelX, sobelY, sobelMat);
    const mean = new window.cv.Mat();
    const stddev = new window.cv.Mat();
    window.cv.meanStdDev(sobelMat, mean, stddev);
    const variance = Math.pow(stddev.data64F[0], 2);
    mat.delete();
    grayMat.delete();
    sobelX.delete();
    sobelY.delete();
    sobelMat.delete();
    mean.delete();
    stddev.delete();

    // console.log(`Tenengrad Variance: ${variance}`); // Log variance for tuning
    return variance < BLUR_THRESHOLD_TENENGRAD;
  }, []);

  // Combined function to detect blurriness using both methods
  const isBlurry = useCallback(
    (image: HTMLImageElement): boolean => {
      // if (isBlurryLaplacian(image)) console.log("fail Laplacian");
      // else if (isBlurryTenengrad(image)) console.log("fail Tenengrad");

      return isBlurryLaplacian(image) || isBlurryTenengrad(image);
    },
    [isBlurryLaplacian, isBlurryTenengrad]
  );

  // Function to detect faces
  const detectFace = useCallback(
    async (imageSrc: string): Promise<boolean> => {
      if (!detector) {
        return false;
      }
      const img = new Image();
      img.src = imageSrc;
      await img.decode();

      // Check for blur using both methods
      if (isBlurry(img)) {
        // console.log("Image is blurry");
        setIsImageClear(false);
        return false;
      }

      const detections = await detector.estimateFaces(img);

      // Ensure bounding box size
      const isClear = detections.some((detection) => {
        const box = detection.box;

        return box.width >= MIN_BOX_SIZE && box.height >= MIN_BOX_SIZE;
      });

      setIsImageClear(isClear);
      return isClear;
    },
    [detector, isBlurry]
  );

  // Capture frame and detect face
  const captureFrame = useCallback(async () => {
    if (
      webcamRef.current &&
      isCapturing &&
      detector &&
      cvLoaded &&
      !isProcessing
    ) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const detection = await detectFace(imageSrc);
        if (detection) {
          setIsProcessing((isProcessing) => !isProcessing);
          const response = await captureAttendanceImage(imageSrc);
          setDisplayMsg(response.msg);
          setCapturedImage(imageSrc);
          setIsCapturing(false);
          console.log("Check flag ", isProcessing);
          // // Convert the base64 image to a Blob
          // const response = await fetch(imageSrc);
          // const blob = await response.blob();

          // // Create a FormData object and append the Blob
          // const formData = new FormData();
          // formData.append("photo", blob, "capture.jpg");

          // // Submit the photo to the Node server
          // const serverResponse = await fetch("YOUR_NODE_SERVER_URL", {
          //   method: "POST",
          //   body: formData,
          // });

          // if (serverResponse.ok) {
          //   console.log("Photo submitted successfully");
          // }

          setTimeout(() => {
            setCapturedImage(null);
            setIsCapturing(true);
            setIsProcessing(false);
          }, 5000); // Wait for 5 seconds before capturing again

          // console.log("stopping");
          return; // Stop further capture until timeout is done
        }
      }
    }
    requestAnimationFrame(captureFrame);
  }, [webcamRef, detectFace, isCapturing, detector, cvLoaded, isProcessing]);

  // Start capturing frames
  useEffect(() => {
    if (isCapturing) {
      requestAnimationFrame(captureFrame);
    }
  }, [isCapturing, captureFrame]);

  return (
    <div className="camera_area">
      <h1>Auto Capture</h1>
      <div className={`webcam-frame ${isImageClear ? "clear" : "unclear"}`}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={IMG_SIZE}
          height={IMG_SIZE}
          videoConstraints={videoConstraints}
          id="webcam"
        />
      </div>
      {capturedImage && (
        <div className="response_msg">
          <h2>Face Detected!</h2>
          <h3>{displayMsg}</h3>
          {/* <img src={capturedImage} alt="Captured Frame with Face" /> */}
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
