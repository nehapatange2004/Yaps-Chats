import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./wrapper/authWrapper.tsx";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter.tsx";
import ChatProvider from "./wrapper/chatWrapper.tsx";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
      <BrowserRouter>
        <ChatProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ChatProvider>
      </BrowserRouter>
    
  // </StrictMode>
);
