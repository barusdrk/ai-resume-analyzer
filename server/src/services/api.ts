export async function uploadResume(
  file: File
): Promise<string> {

  const formData = new FormData();

  formData.append(
    "resume",
    file
  );


  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );


  return response.data.text;
}
