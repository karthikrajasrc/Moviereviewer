import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router";


const Navbar = () => {
  return (
      <>
          <div className="flex justify-around items-center h-[80px] text-white bg-[oklch(20.8%_0.042_265.755)]">
              <div className="felx flex items-center text-[oklch(68.6%_0.179_58.318)] lg:gap-[10px] md:gap-[6px]">
                  <FontAwesomeIcon icon={faVideo} size="2x" />
              <h1 className="lg:text-[25px] md:text-[22px] text-[18px] font-bold">Movie Review</h1>
              </div>
              <div>
                  <ul className="flex flex-row lg:text-[22px] md:text-[20px] text-[18px] lg:gap-[30px] md:gap-[20px] gap-2 font-semibold">
                      <Link to={""}><li>Home</li></Link>
                        <Link to={"review"}><li>Reviews</li></Link>
                  </ul>
              </div>
          </div>
          <Outlet />
      </>
  )
}

export default Navbar
