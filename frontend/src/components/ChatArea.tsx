import { useState, useEffect, useRef } from "react";
import { auth } from "../wrapper/authWrapper";
import { formatedTime } from "../utils/arraymethods";

import { chat } from "../wrapper/chatWrapper";
import AllUsers from "./AllUsers";

const ChatArea = () => {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const editingMessageRef = useRef<string | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const {
    userDetails,
    selectedUser,
    setSelectedUser,
    onlineUsers,
    // sendMessage,
    sendBase64Message,
    deleteMessage,
    editMessage,
    loading,
    inputRef,
    handleSendTypingStatus,
    typing,
    setTyping
  } = auth();
  const [editing, setEditing] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const { allMessages, setAllMessages } = chat();

  const [Base64Image, setBase64Image] = useState<string | null>(null);
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [moreVisibleFor, setMoreVisibleFor] = useState<string | null>(null);
  const myId = userDetails?._id;
  // useEffect(()=> {checkAuth()}, [])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 10); // small delay to allow mounting

      return () => clearTimeout(timer);
    }
  }, [loading]);
  // const more = [
  //   {
  //     label: "Delete",
  //     styling: "text-red-800",
  //     onclick: (messageId: string) => {
  //       deleteMessage(messageId);
  //     },
  //   },
  // ];

  const calculateBase64URL = () => {
    const file = inputImageRef.current?.files?.[0];
    if (!file) {
      return null;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("FileReader.result: ", fileReader.result as string);
      setBase64Image(fileReader.result as string);
    };
    const base64 = fileReader.readAsDataURL(file);
    console.log("Base64: ", base64);
    
    
  };
  // const handleSendMessage = () => {
  //   // const file = e.target.files?.[0];
  //   const file = inputImageRef.current?.files?.[0];
  //   const text = inputRef.current?.value.trim();
  //   console.log("The file useRef: ", file);
  //   if (!file && text) {
  //     sendMessage(inputRef.current?.value, null);
  //   }
  //   if (!text && file) {
  //     console.log("empty text");
  //     sendMessage(null, file);
  //     console.log("selected image: ", file);
  //   }
  //   if (file && text) {
  //     sendMessage(inputRef.current?.value, file);
  //   }

  //   if (inputImageRef.current) inputImageRef.current.value = "";
  //   console.log("Deleted image from useRef: ", inputImageRef.current?.files);
  //   return;
  // };
  const handleSend64Message = () => {
    // const file = e.target.files?.[0];
    const file = inputImageRef.current?.files?.[0];
    const text = inputRef.current?.value.trim();
    console.log("The file useRef: ", file);
    if (!Base64Image && text) {
      sendBase64Message(inputRef.current?.value, null);
    }
    if (!text && Base64Image) {
      console.log("empty text");
      sendBase64Message(null, file);
      console.log("selected image: ", Base64Image);
    }
    if (Base64Image && text) {
      sendBase64Message(inputRef.current?.value, Base64Image);
    }

    if (inputImageRef.current) inputImageRef.current.value = "";
    console.log("Deleted image from useRef: ", inputImageRef.current?.files);
    return;
  };


  useEffect(() => {
    // setScrollDown(false);
    messageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [allMessages, typing]);

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement === inputRef.current) {
        // e.preventDefault();
        if (e.shiftKey) {
          //allow default behaiviour : having a line break!
          return;
        }
        if (!editing) {
          sendButtonRef.current?.click();

          console.log("enter Key pressed");
        } else {
          editButtonRef.current?.click();

          console.log("enter Key pressed on edit");
        }
        //otherwise just have the message sent!

        return;
      }
      console.log("A key is pressed ");
    };

    document.addEventListener("keydown", handleEnterPress);
    return () => document.removeEventListener("keydown", handleEnterPress);
  }, [editing]);

  return (
    <div
      className={`w-full h-[calc(100dvh-84px)] flex flex-row justify-between rounded-4xl backdrop-brightness-110 border border-current/10 fade-in ${
        !fadeIn ? "" : "loaded"
      }`}
    >
      <div
        className={`flex flex-wrap justify-around max-[769px]:${
          isSideBarVisible ? "block" : "hidden"
        } max-[769px]:w-full w-[36vw] rounded-tr-2xl`}
      >
        <AllUsers setIsSideBarVisible={setIsSideBarVisible} />{" "}
      </div>

      {selectedUser ? (
        <div
          className={`flex item-center justify-center max-[769px]:w-full max-[769px]:${
            isSideBarVisible ? "hidden" : "block"
          } w-[64vw]`}
        >
          <div
            className={`flex flex-col flex-wrap justify-between max-[769px]:w-full max-[769px]:${
              isSideBarVisible ? "hidden" : "block"
            } w-[64vw]`}
          >
            <div className="h-[60px] border-b border-base-300/80 flex items-center justify-start gap-2 px-4 shrink-0">
              {/* back button */}
              <button
                type="button"
                className="hidden max-[769px]:flex active:scale-85 active:bg-white/50 transition-transform delay-200 ease-in-out rounded-2xl"
                onClick={() => {setIsSideBarVisible(true); setSelectedUser(null); setAllMessages([])}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <div className="p-2.5 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div className="avatar">
                      <div className="size-10 rounded-full relative">
                        <img
                          src={
                            selectedUser?.profilepic ||
                            "https://t4.ftcdn.net/jpg/05/89/93/27/240_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                          }
                        />
                      </div>
                    </div>

                    {/* User info */}
                    <div>
                      <h3 className="font-medium">{selectedUser?.name}</h3>
                      <p className="text-sm text-base-content/70 text-left">
                        {/* {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"} */}
                        {onlineUsers.includes(selectedUser?._id)
                          ? "Online"
                          : "Offline"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* actual chat messages! */}
            <div className="transition-all ease-in-out delay-100 flex-1 flex-wrap wrap-anywhere overflow-y-auto px-4 py-2 space-y-2 max-[769px]:h-[calc(70dvh)]">
              {allMessages?.map((ele: any, index: number) => (
                <div
                  className={`chat ${
                    myId !== ele.senderId ? "chat-start" : "chat-end"
                  }`}
                  key={index}
                >
                  <div className="chat-image avatar"></div>
                  <div className="chat-header">
                    {ele.senderId ===userDetails?._id? "": selectedUser.name }
                    <time className="text-xs opacity-50">
                      {formatedTime(`${ele.updatedAt }`)}
                    </time>
                  </div>
                  <div className="relative chat-bubble max-w-[75%] text-left">
                    {ele.image && (
                      <div>
                        {" "}
                        <img src={`${ele.image}`} className="h-40" /> <br />
                      </div>
                    )}
                    {ele.text}
                    {ele.senderId === userDetails?._id && !editing && (
                      <div
                        title={"more"}
                        className="absolute right-0 top-0.5 p-0 cursor-pointer rounded-full hover:bg-white/20 active:bg-white/40"
                      >
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() =>
                            setMoreVisibleFor((prev) =>
                              prev === ele._id ? null : ele._id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5 lg:size-4 p-0"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    {moreVisibleFor &&
                    !editing &&
                    moreVisibleFor === ele._id ? (
                      <div className="absolute top-4 right-4 flex flex-wrap wrap-anywhere flex-col w-[160px] transition-all delay-200 ease-in-out bg-accent/70 rounded-xl rounded-tr-[2px] p-2 text-xs border z-30">
                        <button
                          type="button"
                          className="text-error font-bold p-1 cursor-pointer hover:scale-95 active:scale-90"
                          onClick={() => {
                            deleteMessage(`${ele._id}`);
                            setAllMessages((prev: typeof ele) =>
                              prev.filter(
                                (items: typeof ele) => items._id !== ele._id
                              )
                            );
                          }}
                        >
                          Delete for everyone
                        </button>
                        <button
                          type="button"
                          className="text-accent-content font-bold p-1 cursor-pointer hover:scale-95 active:scale-90"
                          onClick={() => {
                            if (inputRef?.current) {
                              inputRef.current.value = ele.text;
                              // inputRef.current.focus;
                              setEditing(true);
                              editingMessageRef.current = `${ele._id}`;
                              inputRef.current.focus();
                              setMoreVisibleFor(null);
                            }
                          }}
                        >
                          Edit Message
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="chat-footer opacity-50">{
                    ele.senderId==userDetails._id && ele.isRead?"read": ""
                    // ele.senderId==userDetails._id? "me":"not-me"
                    }</div>
                </div>
              ))}
              {typing && <div className="chat chat-start">
                <div className="relative chat-bubble max-w-[75%] text-left bg-accent/20 animate-pulse transition-all ease-in-out">Typing...</div> </div>}
              <div ref={messageRef} />
              
            </div>
            <div className="relative h-[60px] flex items-center justify-start gap-2 px-6 border-t border-base-300">
              {/* attach / image button */}
              <button
                type="button"
                onClick={() => {
                  inputImageRef.current?.click();
                }}
                className="rounded-full active:bg-white/20 active:scale-90 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button>
              <input
                type="file"
                ref={inputImageRef}
                onChange={() => calculateBase64URL()}
                className="hidden"
              />
              {Base64Image && (
                <div className="absolute bottom-15 left-6 h-30 border border-base-200 shadow-2xs shadow-accent-content rounded-2xl rounded-bl-[0px] ">
                  <img
                    src={`${Base64Image}`}
                    alt="selected img"
                    className="h-30 rounded-2xl rounded-bl-[0px] opacity-80"
                  />{" "}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-accent rounded-full active:bg-accent-content"
                    onClick={() => {
                      setBase64Image(null);
                      if (inputImageRef?.current) {
                        inputImageRef.current.value = "";
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      className="size-7 stroke-accent-content  active:stroke-accent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <input
                type="text"
                ref={inputRef}
                // value = {`${inputRef?.current?.value? inputRef.current.value:""}`}
                onFocus={() => {
                  inputRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                
                onChange={() => {
                  console.log(
                    "THe changed inputRef Val: ",
                    inputRef.current?.value
                  );
                  handleSendTypingStatus(selectedUser?._id, userDetails?._id);
                }}
                placeholder="Type Something"
                className="p-2 border border-base-300 rounded-2xl w-full focus:outline focus:outline-accent-content/50 focus:border focus:border-accent-content"
              />
              {/*direct send button */}
              <button
                type="button"
                onClick={() => {
                  // sendMessage(inputRef.current?.value);
                  setTyping(false);
                  // handleSendMessage();
                  handleSend64Message()
                  setBase64Image(null);
                  inputRef.current?.value
                    ? (inputRef.current.value = "")
                    : null;
                }}
                ref={sendButtonRef}
                className={`${
                  editing ? "hidden" : "block"
                } active:scale-85 active:bg-white/30 rounded-full hover:scale-95 cursor-pointer`}
              >
                {/* send button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
              {/* is editing done send button */}
              <button
                type="button"
                onClick={() => {
                  // sendMessage(inputRef.current?.value);
                  // handleSendMessage();
                  // setBase64Image(null);

                  editMessage(
                    editingMessageRef.current,
                    inputRef.current?.value
                  );
                  console.log(
                    "The modification req text: ",
                    inputRef.current?.value
                  );
                  editingMessageRef.current = null;
                  setEditing(false);
                  inputRef.current?.value
                    ? (inputRef.current.value = "")
                    : null;
                }}
                ref={editButtonRef}
                className={`${
                  editing ? "block" : "hidden"
                } active:scale-85 active:bg-white/30 rounded-full hover:scale-95 cursor-pointer`}
              >
                {/* edit done button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex item-center justify-center max-[769px]:w-full max-[769px]:${
            isSideBarVisible ? "hidden" : "block"
          } w-[64vw]`}
        >
          <div className="flex flex-col flex-wrap wrap-anywhere justify-center items-center max-[769px]:hidden w-[100%] h-[100%]">
            {" "}
            <img
              src="/messaging.svg"
              alt="messaging"
              className="size-90 opacity-70"
            />
            Select and start chatting{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
