import React, { useEffect, useState } from 'react'
import '../../scss/Apod.scss'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Apod() {

  const navigate = useNavigate()
  const [fact, setFact] = useState('')
  const [date, setDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDateValid, setIsDateValid] = useState(false); // State to track if the selected date is valid

  // const fetchData = () => {

  //   Axios.post('http://localhost:8080/api/user/apods',{
  //     date : date 
  //   },{
  //     headers : {
  //       authtoken : sessionStorage.getItem('token')
  //     }
  //   })
    
  //   Axios.get(`https://api.nasa.gov/planetary/apod?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS&date=${date}`)
  //     .then((res) => {
  //       setFact(res.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error)
  //       setErrorMessage('Error fetching data. Please try again.')
  //     })
  // }
  const fetchData = () => {
    // Check if the token is available in sessionStorage
    const authToken = sessionStorage.getItem('token');
    if (!authToken) {
      // Redirect to login page if token is not available
      navigate('/login')
      return;
    }

    // Verify token on the server
    Axios.post(
      'http://localhost:8080/api/user/apods',
      { date : date },
      {
        headers: {
          authtoken: authToken
        }
      }
    )
      .then((response) => {
        // If token is verified, proceed to fetch data from NASA API
        Axios.get(`https://api.nasa.gov/planetary/apod?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS&date=${date}`)
          .then((res) => {
            setFact(res.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Error verifying token:', error);
        // Redirect to login page if token verification fails
        navigate('/login')
      });
  };
  const handleDateChange = (event) => {
    const selectedDate = event.target.value
    // Check if the selected date is in the future
    if (selectedDate > new Date().toISOString().split('T')[0]) {
      setErrorMessage('Please select a date in the past/present')
      setIsDateValid(false);
    } else {
      setErrorMessage('')
      setDate(selectedDate)
      setIsDateValid(true);
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <>
      <div>
        <div className='topic text-center'>
          <h3>Astronomy Picture Of The Day</h3>
        </div>
        <div className="card_Container d-flex justify-content-center align-items-center">
          <div className="card   mb-3 cardAPOD" style={{ maxWidth: '30rem', maxHeight: '30rem' }}>
            <div className="card-header  ">
              <h5 className='text-center'>Pick A Date</h5>
            </div>
            <div className='justify-text'>
              <p className='instruction'>Select the specific date you're interested in. Whether it's yesterday's cosmic spectacle or an event from years ago, the choice is yours!</p>
            </div>
            <div className="card-body text-success d-flex justify-content-center align-items-center">
              <label htmlFor="dateInput" className="me-2">Date:</label>
              <input type="date" id="dateInput" className="form-control date-input" placeholder="YYYY-MM-DD" onChange={handleDateChange} />
            </div>
            {errorMessage && (
              <div className="card-footer bg-transparent border-danger d-flex justify-content-center">
                <p className="text-danger">{errorMessage}</p>
              </div>
            )}
            <div className="card-footer bg-transparent   d-flex justify-content-center">
              <button className='btn btn-primary' onClick={fetchData}  disabled={!isDateValid}>Submit</button>
            </div>
          </div>
        </div>
        <hr className="custom-hr" />
        <div className='centered-card'>
          <div className="card custom-card cards imagecards ">
            <div className="card-bodies   ">
              <div className='container cardTitle'>
                <h5 className="card-title">{fact?.title}</h5>
              </div>
              <div className='card-text-container'>
                <p className="card-text">
                  {fact?.explanation}
                </p>
              </div>
              <p className="card-text"><small> <span style={{ color: 'black' }}>Date</span> : {fact?.date}</small></p>
            </div>
            <div >
              <img className="card-img-bottom" src={fact?.hdurl} alt="pic not captured!!" style={{ fontStyle: 'italic', color: 'red' }} />
               
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Apod;
