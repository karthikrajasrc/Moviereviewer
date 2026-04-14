import axios from "axios";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fecthMovies = async () => {
      try {
        const page1 = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=0940ac43c5c9b662ea2d5ff720b99547&page=1");
        const page2 = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=0940ac43c5c9b662ea2d5ff720b99547&page=2");
        const page3 = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=0940ac43c5c9b662ea2d5ff720b99547&page=3");
        const page4 = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=0940ac43c5c9b662ea2d5ff720b99547&page=4");

        setMovies([...page1.data.results, ...page2.data.results, ...page3.data.results, ...page4.data.results]);
      } catch (error){
        console.log(error);
      }
    }
    fecthMovies();
}, [])
  return movies;
}

export default useMovies;