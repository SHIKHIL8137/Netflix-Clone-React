import React, { useEffect, useState } from "react";
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    videoType: ""
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log(user)
        navigate('/login'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWQ5MDA4NGZhNjk2ZmIwODkzNGI5ZWY4ZDA4ZTUxZSIsIm5iZiI6MTc0MTk0ODUyMy41MDIsInN1YiI6IjY3ZDQwNjZiMDBjODVjNWEyODY0ZmZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUyzwsEHIhoabQUq1hF8o9V0YmA2esrF1qnJ5WCH29s'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData({
            name: res.results[0].name || "",
            key: res.results[0].key || "",
            published_at: res.results[0].published_at || "",
            videoType: res.results[0].type || ""
          });
        }
      })
      .catch(err => console.error("Error fetching video data:", err));
  }, [id]); 

  const backHome =()=>{
    navigate('/');
  }

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{backHome()}} />
      {apiData.key ? (
        <iframe 
          width="90%" 
          height="90%" 
          src={`https://www.youtube.com/embed/${apiData.key}`} 
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "No date available"}</p>
        <p>{apiData.name || "No title available"}</p>
        <p>{apiData.videoType || "No type available"}</p>
      </div>
    </div>
  );
};

export default Player;
