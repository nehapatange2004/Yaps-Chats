import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import io, { Socket } from "socket.io-client";
import { chat } from "./chatWrapper";
const Authcontext = createContext<any | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setAllMessages, allMessages } = chat();
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<{
    _id: string;
    name: string;
    email: string;
    profilepic: string;
    updatedAt: string;
    preferences: [];
  }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typing, setTyping] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<[]>([]);
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    name: string;
    email: string;
    profilepic: string;
    updatedAt: string;
    preferences: [];
  } | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userTheme = localStorage.getItem("theme") || "coffee";
  const [theme, setTheme] = useState<string>(userTheme);
  const [pageReloaded, setPageReloaded] = useState<boolean>(true);
  const selectedUserRef = useRef(selectedUser);

  useEffect(() => {
    if (!socket) return;
    const handleShowTypingStatus = ({ from }: any) => {
      if (from == selectedUser?._id) {
        console.log("selected User is Typing: ", from);
        setTyping(true);
        clearTimeout((handleShowTypingStatus as any).timeout);
        (handleShowTypingStatus as any).timeout = setTimeout(
          () => setTyping(false),
          2000
        );
      }
    };

    socket?.on("showTypingStatus", handleShowTypingStatus);

    return () => {
      socket.off("showTypingStatus", handleShowTypingStatus);
      clearTimeout((handleShowTypingStatus as any).timeout);
    };
  }, [socket, selectedUser]);

  const handlelogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/signin");
    toast.success("Logged out successfully!");
    disconnectFromSocket();
  };
  const checkAuth = async () => {
    try {
      // setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found after reload!");
        setIsUserLoggedIn(false);
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/auth/dash`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      console.log("RESPONSE DATA: ", data);
      setIsUserLoggedIn(true);
      setUserDetails(data);
      connectToSocket(data._id);
      // toast.success("Logged in successfully!");
    } catch (err) {
      console.log("Error: ", err);
      if (location.pathname === "/") {
        setLoading(false);
        return;
      }
      navigate("/signin");
    } finally {
      setPageReloaded(false);
      setLoading(false);
    }
  };
  const handleSignIn = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      const backend = import.meta.env.VITE_BACKEND;

      setLoading(true);
      if (!formData.email || !formData.password) {
        toast.error("All fields are required!");
        return;
      }
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!pattern.test(formData.email)) return toast.error("Invalid email id");

      console.log("Email: ", formData.email);
      console.log("Password: ", formData.password);

      const response = await axios.post(`${backend}/api/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });
      const data = await response.data;
      const token = data.token;
      console.log("TOKEN Fetched: ", token);
      if (!data.token) {
        toast.error(`${data.error}`);
        setIsUserLoggedIn(false);
        return;
      }
      localStorage.setItem("token", `${token}`);
      console.log(localStorage.getItem("token"));
      await setIsUserLoggedIn(true);
      await setUserDetails(data);
      connectToSocket(data._id);
      toast.success("Logged in successfully!");
      const nav = location.state?.from || "/chat-area";
      console.log("this will navigate to: ", location.state?.from);
      navigate(nav, { replace: true });
      console.log("sent to sever!");
    } catch (err: any) {
      console.log("Error status: ", err);
      toast.error(err?.response.data.error);
      console.log(err?.response?.statusText);
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (formData: {
    name: string;
    email: string;
    password: string;
    
  }) => {
    try {
      setLoading(true);
      if (!formData.email || !formData.name || !formData.password) {
        toast.error("All fields are reqiured");
        return;
      }
      if (formData.password.length < 5) {
        toast.error("Password is too short!");
        return;
      }
      const backend = import.meta.env.VITE_BACKEND;
      const response = await axios.post(`${backend}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilepic: "https://t4.ftcdn.net/jpg/05/89/93/27/240_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
      });
      const data = await response.data;
      const token = data.token;
      console.log("Data Fetched: ", data);
      if (data.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", `${token}`);
        console.log(localStorage.getItem("token"));
        await setIsUserLoggedIn(true);
        connectToSocket(data._id);
        //   window.location.href = "/dashboard";
        toast.success("Account created successfully!");
        navigate("/chat-area");
      }
    } catch (err: any) {
      console.log("Status: ", err);
      // console.log(res.data);

      console.log(err?.response?.statusText);
      if (err?.response?.status === 403) {
        toast.error("User already exits!");
      }
    } finally {
      setLoading(false);
    }
  };
  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/message/users`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log("All Users: ", response.data);
      setAllUsers(response.data);
    } catch (err) {
      console.log("Error getting allUsers: ", err);
    }
  };
  const getAllMessagesForSelectedUser = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/message/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(
        "Messages are feched: length:  ",
        response.data.allMessages.length
      );
      setAllMessages(response.data.allMessages);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSendTypingStatus = (to: String, from: string) => {
    socket?.emit("sendTypingStatus", { to: to, from: from });
  };
  const connectToSocket = (id: string) => {
    console.log("UserDetails at socket formation: ", userDetails);
    const socket = io(`${import.meta.env.VITE_BACKEND}`, {
      query: {
        userId: id,
      },
    });
    if (socket.connected) {
      console.log("Already connected! ");
      return;
    }
    socket.connect();

    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
      setTimeout(() => {
        console.log("All online users: ", userIds);
        getAllUsers();
      }, 2000);
    });
    socket.on("newMessage", (newMessage) => {
      if (selectedUserRef?.current?._id == `${newMessage?.senderId}`) {
        setAllMessages((prev: any) => [...prev, newMessage]);
      }
    });
    socket.on("deletedMessage", (deletedMessage) => {
      // console.log("Deleted message socket emitted: ", deletedMessage)
      console.log(`allMessages: ${allMessages}\n${deletedMessage._id}`);
      setAllMessages((prev: any) =>
        prev.filter((ele: any) => ele._id !== deletedMessage._id)
      );
      // console.log("TEMPMEssAGEs: ", tempAllMessages)
    });
    socket.on("updatedMessage", (updatedMessage) => {
      setAllMessages((prev: any) => {
        const temp = prev.map((ele: any) => {
          if (ele._id === updatedMessage._id) {
            return updatedMessage;
          } else {
            return ele;
          }
        });
        return temp;
      });
    });
    console.log("FE user connected: ", socket.id);
    socket.on("connect", () => {
      console.log("client connected ", socket?.id);
    });
    setSocket(socket);

    console.log("socket: ", socket);
  };
  // const handleTypingStatus = () =>{
  //   socket?.emit("sendTypingStatus", {to: selectedUser?._id, from: userDetails?._id});

  //   socket?.on("ShowTypingStatus", ({from})=>{
  //     console.log("selcted user typing!")
  //     if(from === selectedUser?._id) {
  //       console.log("selected User is Typing");
  //     }
  //   })
  // }
  const disconnectFromSocket = () => {
    if (!isUserLoggedIn && !socket?.connected) {
      console.log("user not authenticated for socket disconnection!");
      return;
    }

    console.log("client connected ", socket?.id);
    socket?.disconnect();
  };
  const sendMessage = async (text: any | null, file: File | null) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (text) formData.append("text", text);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/message/send/${selectedUser?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response after sending message: ", response?.data);
      setAllMessages((prev: any) => [...prev, response.data]);
    } catch (err) {
      console.log("error sending the message: ", err);
    }
  };
  const deleteMessage = async (messageId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        navigate("/signin", { state: { from: location.pathname } });
        return;
      }
      await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/message/delete/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted!");
      toast.success("Deleted!");
    } catch (err) {
      console.log("Error in deleting message: ", err);
    } finally {
      setLoading(false);
    }
  };
  const editMessage = async (messageId: string, text: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found and modification denied!");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/message/edit/${messageId}`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllMessages((prev: any) => {
        const temp = prev.map((ele: any) => {
          if (ele._id === messageId) {
            ele.text = text;
            return ele;
          } else {
            return ele;
          }
        });
        return temp;
      });
      console.log("After edit req: ", response.data);
    } catch (err) {
      console.log("Error in editing the message: ", err);
      toast.error("An unexpected error occured!");
    }
  };

  return (
    <Authcontext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        openForm,
        setOpenForm,
        userDetails,
        setUserDetails,
        loading,
        setLoading,
        theme,
        setTheme,
        pageReloaded,
        setPageReloaded,
        checkAuth,
        handleSignIn,
        handleSignUp,
        handlelogout,
        socket,
        onlineUsers,
        selectedUser,
        setSelectedUser,
        allUsers,
        getAllMessagesForSelectedUser,
        sendMessage,
        deleteMessage,
        editMessage,
        selectedUserRef,
        inputRef,
        handleSendTypingStatus,
        typing,
        setTyping,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export const auth = () => useContext<any>(Authcontext);

export default AuthProvider;
