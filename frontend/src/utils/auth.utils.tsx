import axios from "axios";

export const uploadBrowsedPic = async (
  file: File,
  setUserDetails: React.Dispatch<React.SetStateAction<object>>
) => {
  // const {setUserDetails} = auth();

  // const base64img = fileReader.readAsDataURL(file);
  // console.log("BACKEND: ", backend)
  // const formData = new FormData();
  // formData.append("file", file);

  try {
    const backend = import.meta.env.VITE_BACKEND;
    if (!file) {
      console.log("No file selected! ");
      return null;
    }
    let base64 = await new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);

      fileReader.onerror = (err) => reject(err);
      fileReader.readAsDataURL(file);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Not Authenticated!");
      return;
    }
    const res = await axios.post(
      `${backend}/api/auth/updateprofile`,
      { base64: base64 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.data;
    // await setIsUserLoggedIn(true);
    setUserDetails(data);
    console.log("The secure URL: ", data);
  } catch (err) {
    console.log("err: ", err);
    return null;
  }
};
