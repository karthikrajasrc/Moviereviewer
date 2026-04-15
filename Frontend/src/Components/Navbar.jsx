import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from "react-router";
import instance from "../Protectedinstances/axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../authProvider";


const Navbar = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogout = async () => {
            try {
              const res = await instance.get("/auth/logout")
              localStorage.removeItem("token");
                setUser(null);
                toast.success(res.data.message);
                navigate("/login");
            }
            catch (error){
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
            }
        }


  return (
      <>
          <div className="flex justify-around items-center h-20 text-white bg-slate-900">
              <div className="felx flex items-center text-[oklch(68.6%_0.179_58.318)] lg:gap-2.5 md:gap-1.5">
                  <FontAwesomeIcon icon={faVideo} size="2x" />
              <h1 className="lg:text-[25px] md:text-[22px] text-[18px] font-bold">Movie Review</h1>
              </div>
              <div>
                  <ul className="flex flex-row lg:text-[22px] md:text-[20px] text-[18px] lg:gap-7.5 md:gap-5 gap-2 font-semibold">
                      <Link to={""}><li>Home</li></Link>
                        <Link to={"review"}><li>Reviews</li></Link>
                  </ul>
              </div>
              <div>
                  <button className="border border-amber-400 lg:text-xl text-md bg-linear-to-r from-[#F68D17] to-[#EA5415] bg-clip-text text-transparent w-25 px-2 py-1 rounded-2xl text-center font-semibold" onClick={handleLogout}>Logout</button>
              </div>
          </div>
          <Outlet />
      </>
  )
}

export default Navbar
