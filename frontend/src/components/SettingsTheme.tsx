import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { themes } from "../constants/themes";
import { auth } from "../wrapper/authWrapper";
const SettingsTheme = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTheme, pageReloaded } = auth();
  const allThemes = themes();
  const nav = location.state?.from || "/profile";
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  useEffect(() => {
    console.log("Is page reloaded: ", pageReloaded);
    console.log("the nav: ", nav);
    console.log("the location: ", location.state?.from);
    console.log("Theme: ", allThemes);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 10);
  }, [fadeIn]);

  return (
    <div
      className={`relative h-[calc(100dvh-84px)] rounded-2xl border border-current/30 flex flex-wrap flex-col items-center fade-in ${
        !fadeIn ? "" : "loaded"
      }`}
    >
      {" "}
      <br />
      <p className="text-[1.1rem]">Select Theme</p>
      <div className="flex flex-wrap wrap-anywhere justify-center items-center-safe gap-10 w-[95vw] sm:max-w-[60vw] pt-8 pb-8 sm:pt-14 border border-base-200 rounded-2xl">
        {allThemes.map((ele, index) => (
          <button
            className="relative rounded-tl-[14px] rounded-br-xl rounded-tr-2xl h-16 w-32 shadow-xs shadow-accent-content bg-accent text-accent-content hover:scale-95 cursor-pointer overflow-hidden z-10"
            key={index}
            onClick={() => {setTheme(ele); localStorage.setItem("theme", ele)}}
          >
            <span className="absolute bottom-0 left-0 pr-1 pl-1 text-accent-content bg-accent/65 flex flex-wrap wrap-anywhere justify-center items-center backdrop-blur-md rounded-2xl z-4 max-w-[100%]">
              {" "}
              {ele}
            </span>
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-fit w-[100%] h-[100%] ">
              <div data-theme={ele} className="bg-primary h-[100%] w-[20"></div>
              <div
                data-theme={ele}
                className="bg-secondary h-[100%] w-[20%]"
              ></div>
              <div
                data-theme={ele}
                className="bg-accent h-[100%] w-[20%]"
              ></div>
              <div
                data-theme={ele}
                className="bg-base-content h-[100%] w-[20%]"
              ></div>
              <div
                data-theme={ele}
                className="bg-acccent-content h-[100%] w-[20%]"
              ></div>
            </div>
          </button>
        ))}
      </div>
      <button
        type="button"
        className=" absolute top-4 left-4 border rounded-full cursor-pointer active-scale-90 hover:scale-95 transition-all ease-in-out delay-50"
        onClick={() => {
          navigate(nav, { replace: true });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
    </div>
  );
};

export default SettingsTheme;
