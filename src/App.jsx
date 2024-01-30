import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Profile from "./pages/profile"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '*',
      element: <h1>404</h1>,
    },
    {
      path: '/profile',
      element: <Profile/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
