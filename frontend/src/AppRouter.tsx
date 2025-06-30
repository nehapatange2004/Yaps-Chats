// import { Button } from "@mui/material";

import Home from "./components/home.tsx";
import "./App.css";
import NavBar from "./components/navbar.tsx";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/notfound.tsx";
import SignIn from "./components/signin.tsx";
import SignUp from "./components/signup.tsx";
import UpdateProfile from "./components/updateprofile.tsx";
import { auth } from "./wrapper/authWrapper.tsx";
import Loader from "./components/loader.tsx";
import SettingsTheme from "./components/SettingsTheme.tsx";
import ChatArea from "./components/ChatArea.tsx";
import { useEffect } from "react";
function AppRoutes() {
  const { loading, theme, pageReloaded, checkAuth } = auth();
  useEffect(() => {
    
    if (pageReloaded) {
      checkAuth();
    }
    
  }, []);

  return !pageReloaded ? (
    <div
      data-theme={theme}
      className="min-h-dvh h-auto w-dvw scrollbar-hide sm:pr-8 sm:pl-8"
    >
      <div>
        <Toaster />
      </div>
      <NavBar />
      <div className="h-[calc(100dvh-84px)] p-0 mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/settings" element={<SettingsTheme />} />
          <Route path="/chat-area" element={<ChatArea />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {loading && <Loader />}
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default AppRoutes;
