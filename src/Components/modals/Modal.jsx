import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import axios from "axios"
function MyVerticallyCenteredModal(props) {
  const [data,setData] =useState({name:"" , email:"" , });
  useEffect(()=>{

  })
  const handleUpdate = (id) => {
    // Send a PUT request to update the data
    axios.put(`http://82.180.130.113/api/user/updateusers/${id}`, data)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // You can update the state or perform any other actions as needed
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }; 
  const deleteData = (id) => {
    axios.delete(`http://82.180.130.113/api/user/`)
      .then(response => {
        // Handle success (e.g., update your component's state)
        console.log(`Data with ID ${id} has been deleted.`);
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error deleting data:', error);
      });
  }; 
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >            
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           update {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form style={{textAlign: "center"}}>
            <label>name</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
            <label>email</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
            <label>name</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
            <label>name</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
            <label>name</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
            <label>name</label><br></br>
            <input type='text' name='name' onChange={(e)=>{setData({...data ,name : e.target.value  })}} /><br></br>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleUpdate(props.id)}>update</Button>
     
          <Button variant="danger" onClick={deleteData(props.onHide)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Modify() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <button style={{border: "none" , backgroundColor:"white"}} onClick={() => setModalShow(true)}>
 
    
        <a href="#" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                            Edit
                          </a>
        </button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
 export default Modify ;