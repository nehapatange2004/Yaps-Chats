import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../wrapper/authWrapper.tsx";
import {  useNavigate } from "react-router";
import { useLocation } from "react-router";
import SelectProfilePic from "./selectprofilepic.tsx";
import AvatarOrBrowsePicture from "./updateprofilePicSelector";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backend = import.meta.env.VITE_BACKEND;

  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    userDetails,
    setUserDetails,
    pageReloaded,
    setPageReloaded,
    loading,
    setLoading,
  } = auth();

  const [isAllAvatarVisible, setIsAllAvatarVisible] = useState(false);
  // const [profilepic, setProfilePic] = useState<string>(userDetails.profilepic);
  const [gender, setGender] = useState("male");
  const [selected, setSelected] = useState<boolean>(false);
  // const [isAvatar, setIsAvatar] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState<string>("");

  const req = async () => {

    const backend = import.meta.env.VITE_BACKEND;
    try {
      const token = localStorage.getItem("token");
      console.log("TOKENEXISTS? -", token && true);
      if (token) {
        const response = await axios.get(`${backend}/api/auth/dash`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await setIsUserLoggedIn(true);

        const data = await response.data;
        console.log("RESPONSE DATA: ", data);

        await setUserDetails(data);

        return true;
      } else {
        console.log("No token found in FE");
        // navigate("/signin");
        return false;
      }
    } catch (err) {
      await setIsUserLoggedIn(false);
      // await setUserDetails(null);
      // navigate("/signin");
      console.log("Error: ", err);
      return false;
    }
  };
  useEffect(() => {
    // const nav = window.performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    // const navType = nav?.[0].type;
    // console.log("The navType is: ", navType);

    console.log("Is page reloaded: ", pageReloaded);
    setPageReloaded(false);
    const checkAuth = async () => {
      const isAuthenticated = await req();
      console.log("req: ", isAuthenticated);
      setLoading(false);
      if (!isAuthenticated) {
        console.log("isAuthenticated: ", isAuthenticated);
        navigate("/signin", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };
    checkAuth();
    console.log("In the update Profile!!!!!");
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 10); // small delay to allow mounting

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleUpdateProfile = async (ele: string) => {
    try {
      if (error !== "") {
        console.log("Unexpected error!!!");
        return;
      }
      const token = localStorage.getItem("token");
      console.log(3);
      const response = await axios.post(
        `${backend}/api/auth/updateprofile`,
        {
          profilepic: ele,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(4);
      const data = await response.data;
      console.log(5);
      console.log("DAta fetched: ", data);
      // console.log("tokem : ", data.token);

      // console.log("sent to sever!");
      console.log("old user details: ", userDetails);
      console.log("Updated status: ", response.status);
      await setUserDetails(data);
      console.log("New user details: ", userDetails);

      return;
    } catch (err: any) {
      console.log("Status: ", err);
      // console.log(res.data);
      setError("*Error");
      console.log(err?.response?.statusText);
      // if (err?.response?.status === 304) {
      //   setError("*Error occured! Please try again later!");
      // }
    }
  };
  // useEffect(() => {
  //   showPassword === "password"
  //     ? setEyeIcon(
  //         <>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth="1.5"
  //             stroke="currentColor"
  //             className="size-6"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
  //             />
  //           </svg>
  //         </>
  //       )
  //     : setEyeIcon(
  //         <>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="size-6"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  //             />
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  //             />
  //           </svg>
  //         </>
  //       );
  //   showConfirmPassword === "password"
  //     ? setEyeIcon2(
  //         <>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth="1.5"
  //             stroke="currentColor"
  //             className="size-6"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
  //             />
  //           </svg>
  //         </>
  //       )
  //     : setEyeIcon2(
  //         <>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="size-6"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  //             />
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  //             />
  //           </svg>
  //         </>
  //       );

  // }, [showPassword, showConfirmPassword]);
  // useEffect(()=>{
  //   const authenticateUser = async() =>{
  //       try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`${backend}/api/auth/signin/dash`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     await setIsUserLoggedIn(true);

  //     const data = await response.data;
  //     console.log("RESPONSE DATA: ", data);

  //     setUserDetails(data);
  //   } catch (err) {
  //     await setIsUserLoggedIn(false);
  //     console.log("Error: ", err);
  //   }
  //   }
  //   authenticateUser();
  // }, [])
  // !isUserLoggedIn? location.state.from =

  return isUserLoggedIn ? (
    <div
      className={`flex flex-col gap-4 justify-center items-center w-full min-h-96 fade-in ${
        !fadeIn ? "" : " loaded"
      }`}
    >
      <form className="relative flex flex-col gap-8 justify-center items-center pt-8 pb-12 rounded-lg w-72 sm:w-96 px-6 py-8 ring border focus:scale-x-200">
        {/* <img src = /> */}
        {/* <Avatarload
              ele={`${
                userDetails?.profilepic ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }`}
              index={0}
              /> */}

        <div
          // onClick={() => setIsAllAvatarVisible(true)}
          className="relative rounded-full"
        >
          <img
            src={`${
              userDetails.profilepic ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }`}
            alt={`profilepic`}
            // name = {"hhjsdhjhds"}
            // onClick={() => {setProfilePicture(`${ele}`); setIsAllAvatarVisible(false)}}
            className={`h-32 w-32 rounded-full border bg-gray-400`}
          />
          <button
            type="button"
            className=" bg-accent-content absolute bottom-[4px] left-[84px] p-1 border rounded-full cursor-pointer hover:bg-purple-700 active:scale-95 "
            onClick={() => setSelected(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="bg-accent"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </button>
        </div>

        <input
          type="name"
          name="text"
          placeholder="Enter Full Name"
          value={userDetails.name}
          // onFocus={}
          disabled
          // readOnly

          // onChange={handleChange}
          // ={validateEmail}
          // onBlur={validateEmail}

          className={`w-full p-1.5 border-b-2 rounded 
          `}
        />
        <input
          type="name"
          name="text"
          placeholder="Enter Full Name"
          value={userDetails.email}
          // onFocus={}
          disabled
          // readOnly

          // onChange={handleChange}
          // ={validateEmail}
          // onBlur={validateEmail}

          className={`w-full p-1.5 border-b-2 rounded
          `}
        />

        {/* <div className="relative">
          <input
            type={`${showPassword}`}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            // disabled
            // value="oihsvihdvhdhfihoihfihdfhiodhfiodhiodhfiodho"
            required
            className="p-2 w-full rounded border user-invalid:border-red-500 pr-9"
          />

          <button
            type="button"
            className="absolute right-2 top-2.5 text-sm text-black-500 cursor-pointer backdrop-blur-xs"
            onClick={() => {
              showPassword === "password"
                ? setShowPassword("text")
                : setShowPassword("password");
            }}
          >
            {eyeIcon}
          </button>
        </div>
        <div className="relative">
          <input
            type={`${showConfirmPassword}`}
            name="confirm_password"
            placeholder="Confirm password"
            onChange={handleChange}
            // disabled

            required
            className="p-2 w-full rounded border user-invalid:border-red-500 pr-9"
          />

          <button
            type="button"
            className="absolute right-2 top-2.5 text-sm text-black-500 cursor-pointer backdrop-blur-xs"
            onClick={() => {
              showConfirmPassword === "password"
                ? setShowConfirmPassword("text")
                : setShowConfirmPassword("password");
            }}
          >
            {" "}
            {eyeIcon2}
          </button>
        </div> */}
        
        {/* <button
              type="button"
              className="bg-sky-500 rounded p-1 cursor-pointer hover:bg-sky-600 drop-shadow-lg drop-shadow-black-500/50 z-[2]"
              onClick={() => {
                // handleUpdateProfile();
                navigate("/profile");
              }}
            >
              Save and update
            </button> */}
      </form>
      {selected && (
        <AvatarOrBrowsePicture
          setIsAllAvatarVisible={setIsAllAvatarVisible}
          setSelected={setSelected}
          // setIsAvatar={setIsAvatar}
        />
      )}
      {isAllAvatarVisible && (
        <SelectProfilePic
          // setIsLoading={setIsLoading}
          isAllAvatarVisible={isAllAvatarVisible}
          setIsAllAvatarVisible={setIsAllAvatarVisible}
          gender={gender}
          setGender={setGender}
          // setProfilePic={setProfilePic}
          setSelected={setSelected}
          selected={selected}
          handleUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  ) : null;
};

export default UpdateProfile;
