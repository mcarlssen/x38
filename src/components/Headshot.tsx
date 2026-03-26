import './Headshot.css';

const Headshot = () => {
  return (
    <div className="headshot-container fade-in-up">
      <div className="headshot-wrapper">
        <img 
          src="/images/mt.webp" 
          alt="Mike Thorn" 
          className="headshot-image"
        />
        <div className="headshot-overlay">
          <div className="overlay-gradient"></div>
          <svg className="overlay-text-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Arc path following bottom of 200px circle (radius 100px, center at 100,100) */}
              {/* Points calculated for bottom arc: at y=185, x = 100 ± sqrt(100² - 85²) ≈ 100 ± 52 */}
              {/* Using small arc (flag=0) with clockwise sweep (flag=1) for downward concave curve */}
              <path id="text-curve" d="M 5 110 A 100 100 0 0 0 150 183" fill="none" />
            </defs>
            {/* #opentowork 
            <text className="overlay-text" fill="white">
              <textPath href="#text-curve" startOffset="8%">
                #opentowork
              </textPath>
            </text>
            */}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Headshot;

