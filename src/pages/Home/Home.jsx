import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_titile from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import Titilecards from '../../components/Titilecards/Titilecards';
import Footer from '../../components/Footer/Footer';

const Home = ({ onLogout }) => {
  return (
    <div className='home'>
      {/* Pass the onLogout function to the Navbar */}
      <Navbar onLogout={onLogout} />
      <div className='hero'>
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_titile} alt="" className='caption-img' />
          <p>
            A thrilling journey unfolds as a young hero battles inner demons, discovers true love, 
            and fights against all odds to save the world from destruction.
          </p>
          <div className='hero-btns'>
            <button className='btn'>
              <img src={play_icon} alt="" /> Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
          <Titilecards />
        </div>
      </div>
      <div className="more-cards">
        <Titilecards title={"Blockbuster Movies"} category={"top_rated"} />
        <Titilecards title={"Only on Netflix"} category={"popular"} />
        <Titilecards title={"Upcoming"} category={"upcoming"} />
        <Titilecards title={"Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
