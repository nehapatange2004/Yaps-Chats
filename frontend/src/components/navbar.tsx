import { auth } from "../wrapper/authWrapper.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
function ResponsiveAppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserLoggedIn, handlelogout, userDetails } = auth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleUserMenuClosingOnClickingOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current?.contains(e.target as Node)
      ) {
        console.log("The userMenuRef.current: ", userMenuRef.current);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleUserMenuClosingOnClickingOutside
    );
    return () => {
      removeEventListener("mousedown", handleUserMenuClosingOnClickingOutside);
    };
  }, []);

  const settings = [
    {
      label: "Profile",
      link: "/profile",
      onclick: () => {
        navigate("/profile", {
          state: { from: location.pathname },
          replace: true,
        });
        setIsUserMenuOpen(false);
      },
    },
    {
      label: "Chats",
      link: "/chat-area",
      onclick: () => {
        navigate("/chat-area", {
          state: { from: location.pathname },
          replace: true,
        });
      },
    },
    {
      label: "Settings",
      link: "/settings",
      onclick: () => {
        navigate("/settings", {
          state: { from: location.pathname },
          replace: true,
        });
        setIsUserMenuOpen(false);
      },
    },
    {
      label: "Logout",
      link: "/",
      onclick: () => {
        handlelogout();
        setIsUserMenuOpen(false);
      },
      classProp:
        "text-red-800 border-accent-content hover:bg-red-300/50 active:bg-red-300/80",
    },
  ];
  // const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const pages = [
    // {
    //   label: "Dashboard",
    //   link: `${isUserLoggedIn ? "/dashboard" : "/signin"}`,
    //   isVisibile: isUserLoggedIn,
    // },
    // {
    //   label: "Home",
    //   link: "/",
    //   isVisibile: true,
    // },
    // {
    //   label: "Explore..",
    //   link: "/calculator",
    //   isVisibile: true,
    // },
    {
      label: "Sign in",
      link: `/signin`,
      isVisibile: !isUserLoggedIn,
    },
    {
      label: "Sign up",
      link: `/signup`,
      isVisibile: !isUserLoggedIn,
    },
  ];

  return (
    <div className=" sticky top-0  w-full p-0 m-0 h-[60px] flex flex-row justify-between items-center z-50 rounded-2xl backdrop-brightness-110 shadow-xs/30 shadow-current pr-2 pl-2">
      <div className="min-w-[100%] max-w-[100%] pl-2 pr-2">
        <div className="pl-0 pr-0 p-0 flex flex-row justify-between items-center">
          {/* brand logo */}

          <div className="md:flex hidden justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              // stroke="currentColor"
              className="size-14 stroke-current mask-r-from-secondary-content mask-r-to-12 opacity-75"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            <span className="relative right-[12px] font-mono text-[1.2rem]">
              Yaps&Chats
            </span>
          </div>

          {/* menu for wide screen */}
          {
            <div className="md:flex hidden grow-1">
              {pages.map((page) =>
                page.link
                  ? page.isVisibile && (
                      <NavLink
                        to={page.link}
                        key={page.label}
                        style={({ isActive }) =>
                          isActive
                            ? {
                                textDecoration: "underline",
                                textDecorationColor: "white",
                              }
                            : undefined
                        }
                        className="flex flex-wrap gap-2 pl-4 pr-4 text-[1.2rem] underline-offset-4 hover:scale-90 transition-all ease-in-out "
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {page.label}
                      </NavLink>
                    )
                  : null
              )}
            </div>
          }

          {/* logo for small screen */}
          <div className="md:hidden flex grow-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              // stroke="currentColor"
              className="size-13 stroke-current mask-r-from-secondary-content mask-r-to-12 opacity-75"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            <span className="relative right-[12px] font-extrabold font-mono text-current">
              Yaps&Chats
            </span>
          </div>
          {/* menu for small screen(in phone) */}
          {!isUserLoggedIn && <div className="md:hidden xs:flex ">
            <button
              type="button"
              className=" flex justify-content items-center transition-all delay-1 active:bg-accent-content active:opacity-8 rounded-2xl"
              onClick={() => {
                isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
              }}
              // onBlur={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            {isMenuOpen && !isUserLoggedIn && (
              <div className="flex flex-col text-left text-accent bg-accent-content z-50 rounded border absolute right-7 p-2">
                {pages.map((page) =>
                  page.link
                    ? page.isVisibile && (
                        <button
                          type="button"
                          key={page.label}
                          onClick={() => {setIsMenuOpen(false); console.log(`${page.label} is clicked`); navigate(`${page.link}`)}}
                          className="active:bg-amber-600"
                        >
                          <p className="pt-2 pb-2 pr-1 pl-1">{page.label}</p>
                        </button>
                      )
                    : null
                )}
              </div>
            )}
          </div>}
          {/* useravatar and settings */}
          {isUserLoggedIn && (
            <div className="relative grow-0 z-50" ref={userMenuRef}>
              <div
                className="active:bg-pink-300 rounded-2xl cursor-pointer h-[100%] w-[100%]"
                title="Open settings"
                onClick={() => {
                  setIsUserMenuOpen((prev) => !prev);
                  console.log("Avatar Clicked!");
                }}
                tabIndex={0}
              >
                <img
                  alt={`${userDetails?.name}`}
                  src={`${userDetails?.profilepic}`}
                  className="rounded-full size-10 sm:size-11 cursor-pointer"
                />
                {/* </IconButton> */}
              </div>
              {isUserMenuOpen && (
                <div className="absolute bg-accent right-2 border-2 text-accent-content font-bold overflow-clip rounded-2xl text-right">
                  {settings.map((setting) => (
                    <div
                      key={setting.label}
                      className={`transition-all ease-in-out ${
                        isUserMenuOpen ? "opacity-100 scale-100" : ""
                      }
                        `}
                    >
                      <button
                        type="button"
                        className={`h-[100%] w-[100%] text-center text-accent-content cursor-pointer hover:bg-accent-content/15 active:bg-accent-content/30 border-t pt-4 pb-4 pr-16 pl-16 ${
                          setting.classProp ? setting.classProp : ""
                        }`}
                        onClick={() => {
                          setting.onclick ? setting.onclick() : null;
                          console.log(`${setting.label} is clicked!`);
                          setIsUserMenuOpen(false)
                        }}
                        onBlur={() => setIsUserMenuOpen(false)}
                      >
                        {setting.label}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
