import './Headshot.css';

const Headshot = () => {
  return (
    <div className="headshot-container fade-in-up">
      <div className="headshot-wrapper">
        <img 
          src="/images/mt.png" 
          alt="Mike Thorn" 
          className="headshot-image"
        />
        <div className="headshot-overlay">
          <div className="overlay-gradient"></div>
          <span className="overlay-text">#opentowork</span>
        </div>
      </div>
    </div>
  );
};

export default Headshot;

