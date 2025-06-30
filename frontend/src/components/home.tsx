import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../wrapper/authWrapper";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";

const home = () => {
  const {isUserLoggedIn} = auth();
  const [typingText, setTypingText] = useState<string>("");
  const [typingEnd, setTypingEnd] = useState<boolean>(false);

  const text = "Hello, Welcome to Yaps&Chats";
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (!typingEnd) {
        if (index < text.length) {
          setTypingText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setTypingEnd(true), 5000); // Done typing, start deleting
        }
      } else {
        if (index > 0) {
          setTypingText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setTypingEnd(false); // Done deleting, start again
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, typingEnd]);

  useEffect(()=> {
    if(isUserLoggedIn) {
      navigate("/chat-area");
    }
    toast.custom((t) => (
    <div
      className={`bg-error text-error-content px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      <span>⏳ The server may take a few moments to wake up (thanks to Render’s free hosting).
Sit back, relax — we’re almost there. Then go ahead, sign up, and start exploring! ☕</span>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="text-white hover:text-red-300 font-bold text-xl"
      >
        &times;
      </button>
    </div>
  ), {
    duration: Infinity
  });
  }, [isUserLoggedIn]);
  return (
    <div className="relative h-[calc(100dvh-84px)] border border-current/20 rounded-2xl flex flex-col flex-wrap wrap-anywhere items-center gap-4 overflow-hidden">

      <span className="text-center text-3xl after:border-l-2 pt-18">
        {" "}
        {typingText}
      </span>
      <div className="flex flex-col flex-wrap wrap-anywhere gap-8 p-8 lg:pl-18 lg:pr-18 items-center jutify-center border border-base-200 backdrop-brightness-200 rounded-2xl bg-base-100/50 backdrop-blur-xs shadow-2xl shadow-accent-50/50 z-6">
        <span className="text-center text-3xl">Get started</span>
        <div className="flex flex-row gap-10 justify-center items-center w-full">
          <button onClick={() => {navigate("/signin")}} className="bg-accent text-accent-content rounded-2xl p-2 text-lg border hover:bg-accent-content hover:text-accent transition-all ease-in-out delay-100 text-center pl-5 pr-5 cursor-pointer">
            Sign in
          </button>
          <button onClick={() => {navigate("/signup")}} className="bg-accent text-accent-content rounded-2xl p-2 text-lg border hover:bg-accent-content hover:text-accent transition-all ease-in-out delay-100 text-center pl-5 pr-5 cursor-pointer">
            Sign up
          </button>
        </div>
      </div>
      <img src="/tanChat.png" alt="sample" className="absolute left-2 bottom-2 h-[250px] opacity-50 border-1 border-current/30 mask-b-from-10 rounded-2xl shadow-2xs shadow-amber-50 z-2"/>
      <img src="/tanChatPhone.png" alt="sample" className="absolute right-2 top-2 w-[200px] opacity-50 border-1 border-current/30 mask-l-from-9 rounded-2xl shadow-2xs shadow-amber-50 z-2"/>
    </div>
  );
};

export default home;
