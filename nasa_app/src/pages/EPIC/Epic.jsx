import axios from 'axios'
import React, { useState } from 'react'
//import axios from 'axios'

import '../../scss/Epic.scss'
import { useNavigate } from 'react-router-dom'
function Epic() {
  const [formatdate , setformatdate] = useState('')
  const [fact, setFact] = useState('')
  const [date, setDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDateValid, setIsDateValid] = useState(false); 
  const navigate = useNavigate()
  const handleDateChange =(event)=>{
      
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
 
  const handleSubmit=()=>{
    const token = sessionStorage.getItem('token')
    if(token){
    axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS`).then((res)=>{
       setFact(res.data[0])
       console.log(res.data[0])
       const dates = date;
       const formattedDate = dates.replace(/-/g, '/');
       console.log(formattedDate);
       setformatdate(formattedDate);

       console.log(fact.image)
      // return axios.get('https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS')
       // return axios.get(`https://api.nasa.gov/EPIC/archive/natural/${formattedDate}/png/${fact.image}.png?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS`)
  }).then((response)=>{
       //console.log(response.data)
      // setImage(response.data)

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}else{
 navigate('/login')
}
}
  return (
   <>
     <div>
        <div className='topic text-center'>
          <h3>Earth Polychromatic Imaging Camera</h3>
        </div>
        <div className="card_Container d-flex justify-content-center align-items-center">
          <div className="card border-success mb-3 cardAPOD" style={{ maxWidth: '30rem', maxHeight: '30rem' }}>
            <div className="card-header border-secondary">
              <h5 className='text-center'>Pick A Date</h5>
            </div>
            <div className='justify-text'>
              <p className='instruction'>Select the specific date you're interested in. Whether it's yesterday's cosmic spectacle or an event from years ago, the choice is yours!</p>
            </div>
            <div className="card-body text-success d-flex justify-content-center align-items-center">
              <label htmlFor="dateInput" className="me-2">Date:</label>
              <input type="date" id="dateInput" className="form-control date-input" placeholder="YYYY-MM-DD" onChange={handleDateChange}  />
            </div>
            {errorMessage && (
              <div className="card-footer bg-transparent border-danger d-flex justify-content-center">
                <p className="text-danger">{errorMessage}</p>
              </div>
            )}
            <div className="card-footer bg-transparent border-success d-flex justify-content-center">
              <button className='btn btn-primary' onClick={handleSubmit} disabled={!isDateValid}>Submit</button>
            </div>
          </div>
        </div>
        <hr className="custom-hr" />
        <div className='centered-card '>
          <div className="card custom-card cards imagecards">
            <div className="card-bodies   ">
              <div className='container cardTitle'>
                <h5 className="card-title">{fact.caption} </h5>
              </div>
              <div className='card-text-container'>
                <p className="card-text">
                     <p> version :  {fact.version}</p>
                     <p> image ID :  {fact.image}</p>
                     <p> Identifier :  {fact.identifier}</p>
                </p>
              </div>
              <p className="card-text"><small> <span style={{ color: 'black' }}>Date</span> :{fact.date}  </small> </p>
            </div>
            <div >
              {/* <img className="card-img-bottom"  src= {image} alt="pic not captured!!" style={{ fontStyle: 'italic', color: 'red' }} /> */}
              <img className="card-img-bottom"  src= {`https://api.nasa.gov/EPIC/archive/natural/${formatdate}/png/${fact.image}.png?api_key=CHThXFvIlKxiDsK4OvqS3kdwHWJPbUk70WEYK1iS`} alt="pic not captured!!" style={{ fontStyle: 'italic', color: 'red' }} />
               
            </div>
          </div>
        </div>
      </div>
    
   </>
  )
}

export default Epic
