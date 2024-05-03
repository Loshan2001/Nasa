import React, { useState } from 'react';
import '../../scss/Mrp.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PopUp from './PopUp';
import {Database} from '../../common/database'
function Mrp() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState('');
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id,message) => {
    setSelectedItem(id);
    setSelectedMessage(message);
    setShowModal(true);
  };


  return (
    <>
      <div className="container">
        <div className='topic text-center'>
          <h3>Mars Rover Pictures</h3>
        </div>
        <div className="row  row_container">
         {Database.map((values)=>{
          return(
          <div className="col-md-4" key={values.id}>
          <div className="card mb-3">
            <img src={values.cover} className="card-img-top" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title text-center">{values.title}</h5>
              <p className="card-text">{values.desc}</p>
              <button  className="btn btn-primary" onClick={() => handleShowModal(values.item,values.message)} >Go</button>
            </div>
          </div>
        </div>
          )
         })}  
        
         
        </div>
      </div>

      {/* Modal for the form */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="centeredTitle">Mars Rover</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your form content goes here */}
          {/* Example form */}
          <PopUp id={selectedItem} message={selectedMessage}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
           
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Mrp;