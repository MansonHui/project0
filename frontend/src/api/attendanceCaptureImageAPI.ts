export async function captureAttendanceImage(imageSrc: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/superAdmin/createAttendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: JSON.stringify({ image: imageSrc }), // Pass the base64 image data
      }
    );
    const result = await response.json();

    console.log("result", result);

    return result; // You can adjust this based on your backend response
  } catch (error) {
    throw new Error("Error uploading image");
  }
}
