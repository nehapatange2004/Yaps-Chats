import React from "react";
import { useState } from "react";
const Avatarload = (props: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  ele: string;
  index: number;
  setIsAllAvatarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateProfile: (ele: string) => Promise<void>;
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const handleAvatarUploadOnClick = async () => {
    try {
      props.setIsLoading(true);
      await props.handleUpdateProfile(props.ele);
      console.log("Does the profile pic exist? ", props.ele);
    } catch (err) {
      console.log("Error!");
    } finally {
      props.setIsLoading(false);
      props.setIsAllAvatarVisible(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleAvatarUploadOnClick}
      className="cursor-pointer rounded-full active:scale-75"
    >
      <img
        src={`${props.ele}`}
        alt={`img-${props.index}`}
        // onClick={() => {setProfilePicture(`${ele}`); setIsAllAvatarVisible(false)}}
        className={`sm:h-32 h-20 sm:w-32 w-20 rounded-full border bg-gray-400 ${
          !isImgLoaded ? "animate-pulse" : "animate-none"
        }`}
        onLoad={() => setIsImgLoaded(true)}
      />
    </button>
  );
};

export default Avatarload;
