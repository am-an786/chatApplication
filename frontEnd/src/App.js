import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Chat from "./pages/Chat";
import Avatar from "./pages/SetAvatar";

function App() { 

  const router = createBrowserRouter([
    {path:"/", element: <Chat/>},
    {path:"/login", element: <LogIn/>},
    {path:"/setAvatar", element: <Avatar/>},
    {path:"/register", element: <Register/>}

  ]);

  return (
     <>
       <RouterProvider router={router}/>
     </>
  );
}

export default App;
