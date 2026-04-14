import { createBrowserRouter, RouterProvider } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Review from "./Pages/Review"
import Moviereview from "./Pages/Moviereview"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import PublicRoute from "./Routes/publicRoute"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./Routes/protectedRoute"




const App = () => {

  const router = createBrowserRouter([
    {
      path: "",
      element:<PublicRoute> <Register /> </PublicRoute> 
    }, 
    {
      path: "/login", 
    element: <PublicRoute> <Login /> </PublicRoute>
    },
    {
      path: "/home",
      element: <ProtectedRoute> <Navbar /></ProtectedRoute>,
      children: [
        {
          path: "",
          element: <ProtectedRoute><Home /></ProtectedRoute> 
        },
        {
          path: "review",
          element: <ProtectedRoute><Review /></ProtectedRoute> 
        },
        {
          path: "review/:id",
          element: <ProtectedRoute><Moviereview /></ProtectedRoute> 
        }
      ]
    }
  ])

  return (
    <>
      
      <Toaster position="top-center"
  toastOptions={{
    style: {
      background: "#1f2937",
      color: "#fff",
    },
  }} />
      <RouterProvider router={router}>
        
      </RouterProvider>
    </>
  )
}

export default App
