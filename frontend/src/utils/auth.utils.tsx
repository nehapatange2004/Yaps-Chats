import axios from "axios";

export const uploadBrowsedPic = async (file: File, setUserDetails: React.Dispatch<React.SetStateAction<object>>) => {
  const backend = import.meta.env.VITE_BACKEND;
  // const {setUserDetails} = auth();
  if (!file) {
    console.log("No file selected! ");
    return null;
  }
  // console.log("BACKEND: ", backend)
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Not Authenticated!");
  }
  try {
    const res = await axios.post(
      `${backend}/api/auth/updateprofile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
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

