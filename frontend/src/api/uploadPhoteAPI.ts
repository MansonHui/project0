export async function uploadImage(imageSrc: string) {
  const storedData = localStorage.getItem("newStudentId");
  console.log("storedData", storedData);
  console.log("imageSrcfromnewfucntion ", imageSrc);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/superAdmin/uploadStudentImage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: JSON.stringify({ image: imageSrc, studentData: storedData }), // Pass the base64 image data
      }
    );
    const result = await response.json();

    if (response.ok) {
      localStorage.removeItem("newStudentId");
    }

    console.log("result.msg", result.msg);
    return result;
  } catch (error) {
    throw new Error("Error uploading image");
  }
}
