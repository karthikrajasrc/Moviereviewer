import { useState } from "react";
import instance from "../Protectedinstances/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Register = () => {

    const [authForm, setAuthForm] = useState({ Name: "", Email: "", Password: "" });
    const navigate = useNavigate();

    const handleregister = async () => {
        try {
            const res = await instance.post("/auth/register", {Name: authForm.Name, Email: authForm.Email, Password: authForm.Password});
            toast.success(res.data.Message);
            navigate("/login")
             setAuthForm({ Name: "", Email: "", Password: "" });
        }
        catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
        toast.error(msg);
        }
    }

  return (
    <div>
          <h1 className="text-white text-4xl text-center mt-20 font-semibold">Welcome to <span className="text-amber-600">Movie Review</span></h1>
          
          <div>
              <h2 className="text-white font-semibold lg:text-2xl text-xl m-4 text-center my-10"><span className="text-white font-normal text-lg mr-3">New User?</span>Register Here</h2>
              <form onSubmit={(e) => {e.preventDefault(); handleregister(); }} className="flex flex-col gap-7 justify-center items-center">
                  <input type="text" value={authForm.Name} onChange={e => setAuthForm({ ...authForm, Name: e.target.value })} placeholder="Name" className="text-white rounded-lg p-2 border border-gray-700 lg:w-md w-65" required/>
                  <input type="email" value={authForm.Email} onChange={e => setAuthForm({ ...authForm, Email: e.target.value })} placeholder="Email" className="text-white rounded-lg p-2 border border-gray-700 lg:w-md w-65" required/>
                  <input type="password" value={authForm.Password} onChange={e => setAuthForm({ ...authForm, Password: e.target.value })} placeholder="Password" className="text-white rounded-lg p-2 border border-gray-700 lg:w-md w-65" required/>
                  <button type="submit" className="border border-amber-400 lg:text-xl text-md bg-linear-to-r from-[#F68D17] to-[#EA5415] bg-clip-text text-transparent w-25 px-2 py-1 rounded-2xl text-center font-semibold">Register</button>
              </form>
              <p className="text-white text-center mt-8">Already have an account? <Link to={"/login"}><span className="underline font-semibold">Login</span></Link></p>
          </div>
    </div>
  )
}

export default Register
