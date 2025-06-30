import { useRef } from "react";
import { uploadBrowsedPic } from "../utils/auth.utils.tsx";
import { auth } from "../wrapper/authWrapper.tsx";

const avatarOrBrowsePicture = (props: {
  setIsAllAvatarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsAvatar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserDetails, setLoading } = auth();

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      await uploadBrowsedPic(file, setUserDetails);
      await props.setSelected(false);
      setLoading(false);
    }
  };
  return (
    <div className="h-96 absolute right-0 left-0 flex items-center justify-center backdrop-blur-sm z-[3]">
       
        <div className="relative sm:w-[360px] border rounded-2xl flex justify-around flex-wrap wrap-anywhere gap-8 p-10  shadow-2xl">
          <button
            type="button"
            className="flex flex-col text-center items-center justify-center hover:scale-90 cursor-pointer active:scale-90"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              accept="images/*"
              className="hidden"
              onChange={handleOnChange}
            />
            <p className="text-[0.8rem]">Browse image</p>
          </button>
          <button
            type="button"
            className="flex flex-col text-center items-center justify-center hover:scale-90 cursor-pointer active:scale-90"
            onClick={() => {
              props.setIsAllAvatarVisible(true);
              props.setSelected(false);
              // props.setIsAvatar(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p className="text-[0.8rem]">Select avatar</p>
          </button>

          <button
            type="button"
            className="absolute top-[6px] right-[6px] cursor-pointer active:scale-95"
            onClick={() => {
              props.setSelected(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      
    </div>
    
  );
};
export default avatarOrBrowsePicture;
