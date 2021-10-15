import axios from './axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'



function Row({ title, fetchURL, isLargeRow = false }) {

    // ALL THE CONST

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
    }

    fetchData()
 }, [fetchURL])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

    const handleClick = (movie) => {
        if  (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "" )
            .then((url) => {
                // https://www.youtube.com/watch?v=X4bF_quwNtw
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))
        }
    }
    const base_url = "https://image.tmdb.org/t/p/original/"




    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => (
                ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                    <img
                     onClick={() => handleClick(movie)}
                     className={`row__poster ${isLargeRow && "row__posterlarge"}`}
                     key={movie.id}
                     src={`${base_url}${
                     isLargeRow ? movie.poster_path : movie.backdrop_path
                     }`} 
                     alt={movie.name}
                     />
                )
            ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
    </div>
    );
    
}


export default Row
