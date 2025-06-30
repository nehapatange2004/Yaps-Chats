import { createContext, useContext, useState } from "react";

const ChatContext = createContext<any | null>(null)

const ChatProvider = ({children}: {children: React.ReactNode}) =>{
    const [allMessages, setAllMessages] = useState<Array<object>[]>([]);
    const [msg, setMsg] = useState("");
return (
    <ChatContext.Provider value={{allMessages, setAllMessages, msg, setMsg}} >
        {children}
    </ChatContext.Provider>
)
}
export const chat = ()=> useContext<any>(ChatContext);
export default ChatProvider;