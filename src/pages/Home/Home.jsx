import "./Home.css";
import Navbar from "@/components/Navbar/Navbar";
import hero_title from "@/assets/hero_title.png";
import play_icon from "@/assets/play_icon.png";
import info_icon from "@/assets/info_icon.png";
import TitleCards from "@/components/TitleCards/TitleCards";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";

const Home = ({ category }) => {
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjQ3MzhkMjdmMmY0YzU3ZTRhMjUxODdjNDdlMGViNSIsIm5iZiI6MTc1NTI2OTM2OC43MDMsInN1YiI6IjY4OWY0OGY4MDcxYTY1MzUwMzZkODZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jnnm1nQNYo6hdOCToQnKc-Im0IKVglD9y_BJALu3uRo",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, [category]);

  const heroMovie = apiData.find((movie) => movie.id === 1311031) || apiData[0];

  return (
    <div className="home">
      <Navbar />
      {heroMovie && heroMovie.backdrop_path && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title || "Movie backdrop"}
            className="banner-img"
          />
          <div className="hero-caption">
            <img src={hero_title} alt="" className="caption-img" />
            <p className="hero-title">{heroMovie.title}</p>
            <p>{heroMovie.overview}</p>
            <div className="hero-btns">
              <button className="btn">
                <img src={play_icon} alt="" />
                Play
              </button>
              <button className="btn dark-btn">
                <img src={info_icon} alt="" />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
