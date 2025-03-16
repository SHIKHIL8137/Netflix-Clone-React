import React, { useEffect} from "react";
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase'

const Subplayer = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log(user)
        navigate('/login'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);
  

  const backHome =()=>{
    navigate('/');
  }

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{backHome()}} />
      <iframe width="90%" height="90%" src="https://www.youtube.com/embed/80dqOwAOhbo?si=JDLWrioYDRXqolnG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div className="player-info">
        <p>Nov 14, 2018</p>
        <p>The Protector | Official Trailer [HD] | Netflix</p>
        <p>Series</p>
      </div>
    </div>
  );
};

export default Subplayer;
