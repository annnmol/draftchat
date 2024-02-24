import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "@/components/error-page.tsx";
import LoginPage from "@/app/auth/login/page.tsx";
import RegisterPage from "@/app/auth/register/page.tsx";
import AuthLayout from "@/app/auth/layout.tsx";
import Home from "@/app/page.tsx";
import RootLayout from "@/app/layout.tsx";
import ProtectedLayout from "@/app/(protected)/page";
import ChatsPage from "./app/(protected)/chat/page";


// const RootLayout = async () => {
//   const NamedComponent = await import("@/app/layout.tsx");
//   return { Component: NamedComponent.default }
// };


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      //public routes
      { index: true, element: <Home /> },

      //auth routes
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },


      //protected routes
       {
        path: "chat",
        element: <ProtectedLayout />,
         children: [
          { index: true, element: <ChatsPage /> },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
