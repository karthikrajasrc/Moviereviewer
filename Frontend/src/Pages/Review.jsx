import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar } from "@fortawesome/free-solid-svg-icons";
import useMovies from "../Components/Usemovies";
import { Link, useNavigate } from "react-router";
import { useState } from "react";


const Review = () => {

    const movies = useMovies();


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
/*   
  console.log(movies); */

  const uniqueYears = [
  ...new Set(
    movies
      .map(movie => movie.release_date.slice(0, 4))
      .filter(Boolean)
  )
  ].sort((a, b) => b - a); 
  
 

  const [search, setSerach] = useState("")
  const [opgenre, setopgenre] = useState("")
  const [opyear, setopyear] = useState("")
  const [oprating, setoprating] = useState("")
  console.log(oprating)

   const filteredmoview = movies.filter(movie => movie.poster_path && (search ? movie.title.toLowerCase().includes(search.toLowerCase()) : true) && (opgenre ? movie.genre_ids.includes(Number(opgenre)) : true) && (opyear ? movie.release_date.slice(0, 4) == opyear : true) && (oprating === "1 - 5" ? movie.vote_average <= 5 : true) && (oprating === "6 - 10" ? movie.vote_average >= 6 : true) )

  const handleReset = () => {
    setSerach("");
    setopgenre("");
    setopyear("");
    setoprating("");
  }

  const navigate = useNavigate("");

  const handleclick = (id) => {
    navigate(`/home/review/${id}`);
  };

  return (
    <>
      <div className="flex justify-center mt-15">
        <input id="search" placeholder="Search Movie..." className="border border-white-200 text-gray-400 lg:text-[22px] text-[18px] lg:w-125 px-2 py-1 rounded-xl" value={search} onChange={e => setSerach(e.target.value)}></input>
      </div>
      <div className="flex flex-row flex-wrap px-2 lg:gap-3.75 gap-1.25 justify-center mt-5">
      <div className="text-white">
          <select className="text-black bg-white py-1 px-1 rounded-lg text-[15px]"
        value={opgenre}    onChange={e => setopgenre(e.target.value)}>
          <option value="" >Select Genre</option>
          {Object.entries(genreMap).map(([id, name]) => (
            <option key={id} value={id}>{ name}</option>
          ))}
        </select>
        </div>
        <div>
          <select className="text-black bg-white py-1 px-1 rounded-lg text-[15px]"
            value={opyear}  onChange={e => setopyear(e.target.value)}>
            <option value="">Year</option>
            {uniqueYears.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <select className="text-black bg-white py-1 px-1 rounded-lg text-[15px]"
          value={oprating}  onChange={e => setoprating(e.target.value)}>
            <option value="">Rating</option>
            <option>1 - 5</option>
            <option>6 - 10</option>
          </select>
        </div>
        <div>
          <button className="text-black bg-white py-1 px-1 text-[15px] rounded-lg hover:scale-107 duration-100 ease-in-out" onClick={handleReset}>
            Clear Filters X
          </button>
        </div>
      </div>
      <div className="text-white grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full lg:gap-7 gap-0 mt-10 justify-items-center" id="rating">
        {filteredmoview.length === 0 ? (<h1 className="col-span-5 text-center text-2xl my-40 ">
      No movies found for your search!!
    </h1>) : (filteredmoview.map((top, index) => (<div key={`${top.id}-${index}`} className="flex flex-col hover:scale-107 duration-100 ease-in-out border border-[oklch(10.9%_0.041_260.031)] bg-[oklch(18.9%_0.042_264.695)] rounded-2xl py-2 mt-3 lg:h-110 md:h-87.5 md:max-w-55 h-80 w-full max-w-38.75 lg:max-w-67.5 items-center" >
                  <div onClick={() => handleclick(top.id)}> 
                  <img src={`https://image.tmdb.org/t/p/w500${top.poster_path}`} className="lg:w-[220px] md:w-[180px] md:h-[220px] w-[130px] h-[170px] lg:h-[300px] rounded-xl"/>
                      <h1 className="lg:text-[18px] xl:text-[18px] md:text-[18px] text-[15px] lg:w-[200px] md:w-[180px] w-[120px] text-center pt-2">{top.title}</h1>
                      <h2 className="xl:text-[17px] lg:text-[15px] text-[13px] lg:w-[200px] md:w-[180px] w-[120px] text-gray-400 text-center pt-1">
            {top.genre_ids.map((id) => genreMap[id]).filter(Boolean).join(", ")}
                      </h2>
                      <h2 className="text-center pt-1 text-[15px]">Rating:{top.vote_average.toFixed(1)}<span className="text-[oklch(82.8%_0.189_84.429)]"><FontAwesomeIcon icon={faStar}/></span></h2>
                      </div>
              </div>)))}
      </div>
      <div>
              <footer>
                  <div className="flex lg:flex-row md:flex-row md:h-[250px] flex-col lg:justify-center gap-[35px] bg-[oklch(20.8%_0.042_265.755)] pt-10 mt-5 lg:h-[250px] h-[500px] w-full">
                  <div className="lg:w-[400px] md:w-[300px] w-full text-white text-center">
                      <h1 className="lg:text-[22px]  text-[19px] font-bold pb-3">Moview Review</h1>
                      <p className="lg:text-[18px] text-[15px] mx-2">Search thousands of movies, explore detailed information, and share your ratings with an interactive star-based system — all in one place.</p>
                  </div>
                  <div className="lg:w-100 text-white text-center list-none pb-3">
                      <ul className="lg:text-[22px] text-[19px] font-bold">Quick Links</ul>
                      <li className="lg:text-[18px] text-[15px] mx-2"><a href="#search">Search</a></li>
                      <li className="lg:text-[18px] text-[15px] mx-2"><Link to={"/"}>Home</Link></li>
                      <li className="lg:text-[18px] text-[15px] mx-2"><a href="#rating">Rating</a></li>
                  </div>
                  <div className="lg:w-100 text-white text-center">
                      <h1 className="lg:text-[22px] text-[19px] font-bold pb-3">Contact</h1>
                      <h2 className="lg:text-[18px] text-[15px] mx-2">Email us: moviereview@gmail.com</h2>
                      </div>
                      </div>
              </footer>
          </div>
    </>
  )
}

export default Review
