import React, { Component, useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useNavigate } from 'react-router-dom'



const TitleCards = ({title,category})=>{
  const [apiData,setApiData]=useState([])
  const cardsRef = useRef();

  

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=  event.deltaY;
  }
  useEffect(()=>{

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWQ5MDA4NGZhNjk2ZmIwODkzNGI5ZWY4ZDA4ZTUxZSIsIm5iZiI6MTc0MTk0ODUyMy41MDIsInN1YiI6IjY3ZDQwNjZiMDBjODVjNWEyODY0ZmZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUyzwsEHIhoabQUq1hF8o9V0YmA2esrF1qnJ5WCH29s'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
 const navigate = useNavigate()
  const goPlayer = (id)=>{
    navigate(`player/${id}`);
  }

  return(
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData.map((card,index)=>{
            return <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" onClick={()=>{goPlayer(card.id)}} />
              <p>{card.original_title}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}



export default TitleCards