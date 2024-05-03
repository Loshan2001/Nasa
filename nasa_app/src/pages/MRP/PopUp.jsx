import React, { useEffect, useState } from 'react'
import '../../scss/Popup.scss'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'



function PopUp(props) {
    const navigate = useNavigate()
    const [fact, setFact] = useState([])
    const [selectedDate, setSelectedDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [isDateValid, setIsDateValid] = useState(false); // State to track if the selected date is valid

    // useEffect(() => {
    //     if (selectedDate !== '') {
    //         fetchPhotos();
    //     }
    // }, [selectedDate])
    // const fetchPhotos = async () => {
    //     try {
    //         const response = await Axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.id}/photos?sol=1000&api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS&earth_date=${selectedDate}`);
    //         setFact(response.data.photos);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // const handleDateChange = (event) => {
    //     const selectedDates = event.target.value
    //    // Check if the selected date is in the future
    // if (selectedDates > new Date().toISOString().split('T')[0]) {
    //     setErrorMessage('Please select a date in the past/present')
    //     setIsDateValid(false);
    //   } else {
    //     setErrorMessage('')
    //     setSelectedDate(selectedDates)
    //     setIsDateValid(true);
    //   }
    // };

    // const handleSubmit = () => {
        
    //     fetchPhotos();
    // };



    // useEffect(() => {
    //     if (selectedDate !== '') {
    //         fetchPhotos();
    //     }
    // }, [selectedDate])
    const fetchPhotos = async () => {
        try {
            const response = await Axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.id}/photos?sol=1000&api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS&earth_date=${selectedDate}`);
            setFact(response.data.photos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDateChange = (event) => {
        const selectedDates = event.target.value
       // Check if the selected date is in the future
    if (selectedDates > new Date().toISOString().split('T')[0]) {
        setErrorMessage('Please select a date in the past/present')
        setIsDateValid(false);
      } else {
        setErrorMessage('')
        setSelectedDate(selectedDates)
        setIsDateValid(true);
      }
    };

    const handleSubmit = () => {
        const authToken = sessionStorage.getItem('token');
        if (!authToken) {
          // Redirect to login page if token is not available
          navigate('/login')
          return;
        }
    
        // Verify token on the server
        Axios.post(
          'http://localhost:8080/api/user/rovers',
          { date : selectedDate },
          {
            headers: {
              authtoken: authToken
            }
          }
        ).then((response)=>{
            fetchPhotos();
        }).catch((error) => {
            console.error('Error verifying token:', error);
            // Redirect to login page if token verification fails
            navigate('/login')
          });
    };

    return (
        <>
            <div className=" d-flex justify-content-center align-items-center">
                <div className="card border-success mb-3" style={{ maxWidth: '30rem', maxHeight: '30rem' }}>
                    <div className="card-header border-secondary">
                        <h5 className='text-center'>Pick A Date</h5>

                    </div>
                    <div className='justify-text'>
                        <p className='instruction'>select the specific date you're interested in. Whether it's yesterday's cosmic spectacle or an event from years ago, the choice is yours!</p>
                    </div>
                    <div className="card-body text-success d-flex justify-content-center align-items-center">
                        <label htmlFor="dateInput" className=" justify-text " style={{ fontSize: '0.9rem',color:'green',fontWeight:'bold' }}>{props.message}</label>
                        <input type="date" id="dateInput" class="form-control date-input" placeholder="YYYY-MM-DD" onChange={handleDateChange} />
                    </div>

                    <div className="card-footer bg-transparent border-success d-flex justify-content-center">
                        <button className='btn btn-primary' onClick={handleSubmit} disabled={!isDateValid} >Submit</button>
                    </div>
                </div>
            </div>

            {errorMessage && (
              <div className="card-footer bg-transparent border-danger d-flex justify-content-center">
                <p className="text-danger">{errorMessage}</p>
              </div>
            )}
            <hr />



            <div className="w3-container " id="about">
                <div className="w3-content  w3-contentContainer"   >
                    <h5 className="w3-center w3-padding-64"><span className="w3-tag w3-wide">ABOUT THE ROVER</span></h5>



                    <div className=' rover-details'>
                        <p><strong>picked date:</strong> {selectedDate}</p>
                        <p><strong>Rover:</strong> {fact[0]?.rover.name}</p>
                        <p><strong>Camera:</strong> {fact[0]?.camera.full_name}</p>
                        <p><strong>landing_date:</strong> {fact[0]?.rover.landing_date}</p>
                        <p><strong>launch_date:</strong>{fact[0]?.rover.launch_date}</p>
                        <p><strong>status:</strong> {fact[0]?.rover.status}</p>
                        <p><strong>total_photos:</strong> {fact[0]?.rover.total_photos}</p>
                        {/* {console.log(fact[0].rover.name)} */}
                        {/* {console.log(props.id)} */}

                    </div>

                </div>
                <div className='imageSetContainer'>
                    {/* Repeat this div for each image */}
                    {fact.map(photo => (<>
                        <div className="image-wrapper">
                            <img src={photo.img_src} className="img-thumbnail" alt="..." />
                        </div>
                        {/* {console.log(photo.img_src)} */}

                    </>))}
                    {/* Repeat for the remaining images */}
                </div>

            </div>
        </>


    )
}

export default PopUp
