import { useState } from "react";
import Avatarload from "./Avatarload.tsx";
import Loader from "./loader.tsx";

const SelectProfilePic = (props: {
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAllAvatarVisible: boolean;
  setIsAllAvatarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  // setProfilePic: React.Dispatch<React.SetStateAction<string>>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateProfile: (ele: string) => Promise<void>;
}) => {
  let arr = [];
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const maleAvatars = () => {
    arr = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6gP2cXHCBfE3Q4snVK7RZuquprmqEBFHkg&s",
      "https://avatar.iran.liara.run/public/1",
      "https://avatar.iran.liara.run/public/2",
      "https://avatar.iran.liara.run/public/3",
      "https://avatar.iran.liara.run/public/4",
      "https://avatar.iran.liara.run/public/5",
      "https://avatar.iran.liara.run/public/6",
      "https://avatar.iran.liara.run/public/7",
      "https://avatar.iran.liara.run/public/8",
      "https://avatar.iran.liara.run/public/9",
      "https://avatar.iran.liara.run/public/10",
      "https://avatar.iran.liara.run/public/11",
      "https://avatar.iran.liara.run/public/12",
      "https://avatar.iran.liara.run/public/13",
      "https://avatar.iran.liara.run/public/14",
      "https://avatar.iran.liara.run/public/15",
      "https://avatar.iran.liara.run/public/16",
      "https://avatar.iran.liara.run/public/17",
      "https://avatar.iran.liara.run/public/18",
      "https://avatar.iran.liara.run/public/19",
      "https://avatar.iran.liara.run/public/20",
      "https://avatar.iran.liara.run/public/21",
      "https://avatar.iran.liara.run/public/22",
      "https://avatar.iran.liara.run/public/23",
      "https://avatar.iran.liara.run/public/24",
      "https://avatar.iran.liara.run/public/25",
      "https://avatar.iran.liara.run/public/26",
      "https://avatar.iran.liara.run/public/27",
      "https://avatar.iran.liara.run/public/28",
      "https://avatar.iran.liara.run/public/29",
      "https://avatar.iran.liara.run/public/30",
      "https://avatar.iran.liara.run/public/31",
      "https://avatar.iran.liara.run/public/32",
      "https://avatar.iran.liara.run/public/33",
      "https://avatar.iran.liara.run/public/34",
      "https://avatar.iran.liara.run/public/35",
      "https://avatar.iran.liara.run/public/36",
      "https://avatar.iran.liara.run/public/37",
      "https://avatar.iran.liara.run/public/38",
      "https://avatar.iran.liara.run/public/39",
      "https://avatar.iran.liara.run/public/40",
      "https://avatar.iran.liara.run/public/41",
      "https://avatar.iran.liara.run/public/42",
      "https://avatar.iran.liara.run/public/43",
      "https://avatar.iran.liara.run/public/44",
      "https://avatar.iran.liara.run/public/45",
      "https://avatar.iran.liara.run/public/46",
      "https://avatar.iran.liara.run/public/47",
      "https://avatar.iran.liara.run/public/48",
      "https://avatar.iran.liara.run/public/49",
      "https://avatar.iran.liara.run/public/50",
    ];
    // let str ="";
    // for (let i = 1; i < 51; i += 1) {
    //   arr.push(`https://avatar.iran.liara.run/public/${i}`);
    //   str += `"https://avatar.iran.liara.run/public/${i}", `;
    // }
    // console.log(str);
    return arr;
  };
  const femaleAvatars = () => {
    arr = [
      "https://api.dicebear.com/9.x/big-ears/svg?seed=Jessica&radius=50&translateY=-5&backgroundColor=ffdfbf",

      "https://avatar.iran.liara.run/public/52",
      "https://avatar.iran.liara.run/public/53",
      "https://avatar.iran.liara.run/public/54",
      "https://avatar.iran.liara.run/public/55",
      "https://avatar.iran.liara.run/public/56",
      "https://avatar.iran.liara.run/public/57",
      "https://avatar.iran.liara.run/public/58",
      "https://avatar.iran.liara.run/public/59",
      "https://avatar.iran.liara.run/public/60",
      "https://avatar.iran.liara.run/public/61",
      "https://avatar.iran.liara.run/public/62",
      "https://avatar.iran.liara.run/public/63",
      "https://avatar.iran.liara.run/public/64",
      "https://avatar.iran.liara.run/public/65",
      "https://avatar.iran.liara.run/public/66",
      "https://avatar.iran.liara.run/public/67",
      "https://avatar.iran.liara.run/public/68",
      "https://avatar.iran.liara.run/public/69",
      "https://avatar.iran.liara.run/public/70",
      "https://avatar.iran.liara.run/public/71",
      "https://avatar.iran.liara.run/public/72",
      "https://avatar.iran.liara.run/public/73",
      "https://avatar.iran.liara.run/public/74",
      "https://avatar.iran.liara.run/public/75",
      "https://avatar.iran.liara.run/public/76",
      "https://avatar.iran.liara.run/public/77",
      "https://avatar.iran.liara.run/public/78",
      "https://avatar.iran.liara.run/public/79",
      "https://avatar.iran.liara.run/public/80",
      "https://avatar.iran.liara.run/public/81",
      "https://avatar.iran.liara.run/public/82",
      "https://avatar.iran.liara.run/public/83",
      "https://avatar.iran.liara.run/public/84",
      "https://avatar.iran.liara.run/public/85",
      "https://avatar.iran.liara.run/public/86",
      "https://avatar.iran.liara.run/public/87",
      "https://avatar.iran.liara.run/public/88",
      "https://avatar.iran.liara.run/public/89",
      "https://avatar.iran.liara.run/public/90",
      "https://avatar.iran.liara.run/public/91",
      "https://avatar.iran.liara.run/public/92",
      "https://avatar.iran.liara.run/public/93",
      "https://avatar.iran.liara.run/public/94",
      "https://avatar.iran.liara.run/public/95",
      "https://avatar.iran.liara.run/public/96",
      "https://avatar.iran.liara.run/public/97",
      "https://avatar.iran.liara.run/public/98",
      "https://avatar.iran.liara.run/public/99",
    ];
    // let str = "";
    // for (let i = 51; i < 100; i += 1) {
    //   arr.push(`https://avatar.iran.liara.run/public/${i}`);
    //   str += `"https://avatar.iran.liara.run/public/${i}", `;

    // }
    // console.log(str);
    return arr;
  };
  const allPics = () => {
    const arr = props.gender === "male" ? maleAvatars() : femaleAvatars();
    const mapped = arr.map((ele, index) => (
      <Avatarload
        setIsLoading = {setIsLoading}
        ele={ele}
        index={index}
        // setProfilePic={props.setProfilePic}
        setIsAllAvatarVisible={props.setIsAllAvatarVisible}
        key={index}
        handleUpdateProfile={() => props.handleUpdateProfile(ele)}
      />
    ));
    return (
      <div
        className={`flex flex-wrap wrap-anywhere justify-around gap-2 sm:gap-4 h-96 p-3 sm:p-6 border bg-[#8b8b8b8f] rounded-2xl overflow-y-auto scrollbar-hide overflow-x-hidden backdrop-blur-3xl shadow-xl`}
      >
        {mapped}
      </div>
    );
  };

  return (
    !isLoading? (<div className="absolute z-10 sm:w-full flex flex-wrap wrap-anywhere justify-center mt-10 backdrop-blur-xs">
      <div className="relative flex flex-col flex-wrap wrap-anywhere mt-10 sm:w-[60%] justify-center-safe sm:max-w-[64vw] items-center backdrop-blur-xs drop-shadow-xl shadow-gray-900">
        <button
          className="bg-accent absolute top-[-10px] right-[-10px] z-10 border rounded-full p-1"
          onClick={() => props.setIsAllAvatarVisible(false)}
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="absolute top-[-28px] z-10 border-2 rounded-2xl border-accent bg-[rgba(104,104,104,0.13)] backdrop-blur-xs drop-shadow-xl shadow-gray-900">
          <button
            type="button"
            className={`z-10 ${
              props.gender === "male" ? "bg-accent" : "bg-transparent"
            }  bg-accent rounded-xl p-1.5`}
            onClick={() => props.setGender("male")}
          >
            Male
          </button>
          <button
            type="button"
            className={`z-10 ${
              props.gender === "female" ? "bg-accent" : "bg-transparent"
            }  bg-blue-00 rounded-xl p-1.5`}
            onClick={() => props.setGender("female")}
          >
            Female
          </button>
        </div>
        <div key={props.gender}>{allPics()}</div>
      </div>
    </div>): (
      
      <Loader />
      
    )
  );
};
export default SelectProfilePic;
