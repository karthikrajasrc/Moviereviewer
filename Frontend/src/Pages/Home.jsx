import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faRocket, faStar } from "@fortawesome/free-solid-svg-icons";
import useMovies from "../Components/Usemovies";
import { Link } from "react-router";



const Home = () => {
    const movies = useMovies();
    const top10 = movies?.slice(0, 10) || [];


    const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  27: "Horror",
  10749: "Romance",
  53: "Thriller",
};
    

  return (
      <>
          <div className="flex justify-center mt-10" id="home">
              <h1 className="lg:text-4xl md:text-3xl text-2xl text-white">Welcome To <span className="text-[oklch(68.6%_0.179_58.318)] font-semibold">Movie Review</span></h1>
          </div>
          <div className="text-white flex justify-center mx-1 mt-8">
              <h2 className="lg:text-[22px] md:tedxt-[20px] text-[18px] text-center"><span><FontAwesomeIcon icon={faSearchengin} /></span>Discover &nbsp; &nbsp; <span><FontAwesomeIcon icon={faRocket} /></span> Review &nbsp; &nbsp; <span><FontAwesomeIcon icon={faStar} /></span> Rate Your Favorite Movies.</h2>
          </div>
          <div className="flex justify-center mt-10">
              <h1 className="text-[oklch(82.8%_0.189_84.429)] mx-2 lg:text-[20px] md:text-[20px] text-[16px] text-center">Search thousands of movies, explore detailed information, and share your ratings with an interactive star-based system — all in one place.</h1>
          </div>
          <div className="lg:ml-25 mt-15 ml-4" id="rated">
              <h1 className="lg:text-[28px] text-2xl text-white">Top Rated Movies <span className="text-[oklch(82.8%_0.189_84.429)]"><FontAwesomeIcon icon={faStar}/></span></h1>
          </div>
          <div className="flex justify-center mt-5 mb-5">
              <Link to={"review"}>
              <button className="text-[oklch(68.6%_0.179_58.318)] font-bold lg:text-[22px] border border-white px-2 py-1 rounded-xl bg-white hover:scale-108 duration-100 ease-in-out">Browse More</button></Link>
          </div>
          <div className="text-white grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full lg:gap-7 gap-0 mt-10 justify-items-center">
              {top10.map((top) => (<div key={top.id} className="flex flex-col items-center hover:scale-107 duration-100 ease-in-out border border-[oklch(10.9%_0.041_260.031)] bg-[oklch(18.9%_0.042_264.695)] rounded-2xl py-2 mt-3 lg:h-[440px] md:h-[350px] md:max-w-[220px] h-[320px] w-full max-w-[155px] lg:max-w-[270px] items-center">
                  <div> 
                  <img src={`https://image.tmdb.org/t/p/w500${top.poster_path}`} className="lg:w-[220px] md:w-[180px] md:h-[220px] w-[130px] h-[170px] lg:h-[300px] rounded-xl"/>
                      <h1 className="lg:text-[20px] md:text-[18px] text-[17px] lg:w-[200px] md:w-[180px] w-[120px] text-center pt-2">{top.title}</h1>
                      <h2 className="lg:text-[17px] text-[15px] lg:w-[200px] md:w-[180px] w-[120px] text-gray-400 text-center pt-1">
            {top.genre_ids.map((id) => genreMap[id]).filter(Boolean).join(", ")}
                      </h2>
                      <h2 className="text-center pt-1 text-[16px]">Rating:{top.vote_average < 7 ? "8.5" : top.vote_average.toFixed(1)}<span className="text-[oklch(82.8%_0.189_84.429)]"><FontAwesomeIcon icon={faStar}/></span></h2>
                      </div>
              </div>))}
          </div>
          
          <div>
              <footer>
                  <div className="flex lg:flex-row md:flex-row mt-15 md:h-[250px] flex-col lg:justify-center gap-[35px] bg-[oklch(20.8%_0.042_265.755)] pt-10 mt-5 lg:h-[250px] h-[500px] w-full">
                  <div className="lg:w-[400px] md:w-[300px] w-full text-white text-center">
                      <h1 className="lg:text-[22px]  text-[19px] font-bold pb-3">Moview Review</h1>
                      <p className="lg:text-[18px] text-[15px] mx-2">Search thousands of movies, explore detailed information, and share your ratings with an interactive star-based system — all in one place.</p>
                  </div>
                  <div className="lg:w-[400px] text-white text-center list-none pb-3">
                      <ul className="lg:text-[22px] text-[19px] font-bold">Quick Links</ul>
                      <li className="lg:text-[18px] text-[15px] mx-2"><a href="#home">Home</a></li>
                      <li className="lg:text-[18px] text-[15px] mx-2"><Link to={"review"}>Review</Link></li>
                      <li className="lg:text-[18px] text-[15px] mx-2"><a href="#rated">Top Rated</a></li>
                  </div>
                  <div className="lg:w-[400px] text-white text-center">
                      <h1 className="lg:text-[22px] text-[19px] font-bold pb-3">Contact</h1>
                      <h2 className="lg:text-[18px] text-[15px] mx-2">Email us: moviereview@gmail.com</h2>
                      </div>
                      </div>
              </footer>
          </div>
      </>
  )
}

export default Home
