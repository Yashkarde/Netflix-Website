import React, { useEffect,useRef, useState } from 'react'
import './Titilecards.css'
import card_data from "../../assets/cards/Cards_data";
import {Link} from 'react-router-dom'

const Titilecards = ({title,category}) => {

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDI0MzAyMGE1Mjc0ZTgxYTQxYzNhYzA5NTJiYjI3MiIsIm5iZiI6MTczMjg4NDM3Ny40MDg1NTMxLCJzdWIiOiI2NzQ5NjAxMzEwYWEwMzE5ODY3ZTMyZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.25s3Mkr0z5GPBZagX1Cd9SY16JeR4NRACZoYd0b8dJ4'
    }
  };
  
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='titilecards'>
      <h2>{title?title:"Populer on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt={card.name} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titilecards
