import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import instance from "../Protectedinstances/axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../authProvider";


const Login = () => {
    const [authForm, setAuthForm] = useState({ Email: "", Password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [forgotForm, setForgotForm] = useState({ Email: "", newPassword: "", confirmPassword: "" });
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    
    const handlelogin = async () => {
        try {
            const res = await instance.post("/auth/login", { Email: authForm.Email, Password: authForm.Password });
            localStorage.setItem("token", res.data.Token);
            setUser(res.data.user);
            toast.success(res.data.Message);
            setAuthForm({ userName: "", passWord: "" });
            navigate("/home")
        }
        catch (error){
            const msg = error.response?.data?.Message || "Something went wrong";
        toast.error(msg);
        }
    }

    const handleforgot = async () => {
          try {
    const res = await instance.put("/auth/update", {
      Email: forgotForm.Email,
      newPassword: forgotForm.newPassword,
      confirmPassword: forgotForm.confirmPassword
    });

    toast.success(res.data.message);


    setForgotForm({ userName: "", newPassword: "", confirmPassword: "" });


    setShowPassword(false);

  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
  }
    }


  return (
    <div>
       <div className="flex flex-col justify-center items-center mt-20 gap-5">
              <h1 className="text-white font-extrabold lg:text-5xl text-3xl">Welcome <span className="text-amber-600">Back!</span></h1>
              <h2 className="text-white font-semibold lg:text-2xl text-xl m-4"><span className="text-white font-normal text-lg mr-3">Existing User?</span>login Here</h2>
              <form onSubmit={(e) => {e.preventDefault(); handlelogin(); }} className="flex flex-col gap-7 justify-center items-center">
                  <input type="email" value={authForm.Email} onChange={e => setAuthForm({ ...authForm, Email: e.target.value })} placeholder="Email" className="text-white rounded-lg p-2 border border-gray-700 lg:w-md w-65" required/>
                  <input type="password" value={authForm.Password} onChange={e => setAuthForm({ ...authForm, Password: e.target.value })} placeholder="Password" className="text-white rounded-lg p-2 border border-gray-700 lg:w-md w-65" required/>
                  <button type="submit" className="border border-amber-400 lg:text-xl text-md bg-linear-to-r from-[#F68D17] to-[#EA5415] bg-clip-text text-transparent w-25 px-2 py-1 rounded-2xl text-center font-semibold">Login</button>
              </form>
              <div className="flex justify-center items-center gap-10 mt-4">
                  <p className="text-white text-[12px] lg:text-[18px]">Not yet registered? <Link to={"/"}><span className="underline font-semibold">Register</span></Link></p>
                  <button className="text-gray-400 cursor-pointer text-[12px] lg:text-[18px]" onClick={() => setShowPassword(true)}>Forgot Password?</button>
              </div>
          </div>
          {showPassword && (
              < div className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-sm bg-black/30">
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
                      <div className="bg-white rounded-lg p-8">
                          <div className="flex justify-end">
                              <span><FontAwesomeIcon className="font-bold text-2xl cursor-pointer" icon={faTimes} onClick={() => setShowPassword(false)} /></span>
                          </div>
                          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                          <form onSubmit={(e) => { e.preventDefault();  handleforgot();}} className="flex flex-col gap-7 justify-center items-center">
                  <input type="email" value={forgotForm.Email} onChange={e => setForgotForm({ ...forgotForm, Email: e.target.value })} placeholder="Email" className="text-black rounded-lg p-2 border border-gray-700 lg:w-md w-s" required/>
                              <input type="password" value={forgotForm.newPassword} onChange={e => setForgotForm({ ...forgotForm, newPassword: e.target.value })} placeholder="New Password" className="rounded-lg p-2 border border-gray-700 lg:w-md w-s text-black" required />
                              <input type="password" value={forgotForm.confirmPassword} onChange={e => setForgotForm({ ...forgotForm, confirmPassword: e.target.value })} placeholder="Confirm Password" className="text-black rounded-lg p-2 border border-gray-700 lg:w-md w-s" required/>
                              <button type="submit" className="border border-amber-400 lg:text-xl text-md bg-linear-to-r from-[#F68D17] to-[#EA5415] bg-clip-text text-transparent w-25 px-2 py-1 rounded-2xl text-center font-semibold">Submit</button>
              </form>
                      </div>
                  </div>
              </div >   
          )}
    </div>
  )
}

export default Login
