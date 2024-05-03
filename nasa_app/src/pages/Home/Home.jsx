import React from 'react';
import '../../scss/Home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`${e}`);
  };

 
  return (
    <>
      
      <section className='section-container'>
    
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
          <div className="col ">
            <div className="card shadow-sm cardcontiners">
          <div className='container text-center  container_heading ' style={{color : 'black'}}>Earth Polychromatic Imaging Camera</div>
              <img src="https://www.astronomy.com/wp-content/uploads/sites/2/2023/10/the-earth.jpg?fit=2048%2C2048" className="card-img-top" alt="Thumbnail Image" />
              <div className="card-body">
                <p className="card-text">Its primary function is to capture images of the fully sunlit Earth as it rotates, providing a unique and stunning view of our planet from space. EPIC takes images in multiple wavelengths of light, allowing scientists to study various aspects of Earth's atmosphere, such as aerosols, ozone, and cloud properties.</p>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{handleClick('/epic')}}>View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
          <div className="card shadow-sm cardcontiners">
          <div className='container text-center  container_heading' style={{color : 'black'}}>Mars Rover Photos</div>
              <img src="https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q3/669461/we-drive-the-mars-opportunity-rover-review-car-and-driver-photo-671067-s-original.jpg?fill=1:1&resize=1200:*" className="card-img-top" alt="Thumbnail Image"  />
              <div className="card-body">
                <p className="card-text">The Mars rovers, including Spirit, Opportunity, Curiosity, and Perseverance, have captured and transmitted thousands of stunning photos of the Martian surface since their respective missions began. These images offer valuable insights into the geology, atmosphere, and potential habitability of Mars.</p>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-primary"  onClick={()=>{handleClick('/mars')}}>View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm cardcontiners">
            <div className='container text-center  container_heading 'style={{color : 'black'}}>Astronomy Picture Of The Day</div>
              <img src="https://apod.nasa.gov/apod/image/0002/sat3d_voyager_big.gif" className="card-img-top" alt="Thumbnail Image" />
              <div className="card-body">
                <p className="card-text"> Every day, APOD features a different image or photograph of celestial objects, along with a brief explanation written by a professional astronomer. These images can range from stunning views of planets and galaxies to phenomena like solar eclipses and meteor showers.     </p>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn-group  ">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{ handleClick('/apod')}}>View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
