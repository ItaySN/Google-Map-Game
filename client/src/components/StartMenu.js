
import React,{useState} from "react";
import { Form, Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function StartMenu({showModal,setShowModal,handleStart,userName,level,setUserName,setLevel}) {

    return (
    showModal && (
            <Modal
            show={showModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Where is it ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Hello user!</h4>
                    <p>
                    In this game you need to guess where is the city that show to you on the screen locate on the map. <br/>
                    You only have one chance each city. <br/>
                    good luck :)
                    </p>
                    <Form.Label>Your Name :</Form.Label> <br/>
                        <input
                        type="text"
                        id="userName"
                        placeHolder="Name.."
                        onChange={(e)=>setUserName(e.target.value)}
                        required
                        ></input>
                        <br/>
                        <br/>
                    <Form.Group controlId="levelId">
                    <Form.Label>Choose Level :</Form.Label>
                        <Form.Control as="select" style={{width:'15vw'}} onChange={(e)=>setLevel(e.target.value)}>
                            <option value='1'>Beginner</option>
                            <option value='2'>Amuter</option>
                            <option value='3'>Professional</option>
                            <option value='4'>World-Class</option>
                            <option value='5'>Legendary</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer style={{marginRight:'auto', marginLeft:'auto'}}>
                    <Button  style={{width:'20vw'}} onClick={() => handleStart(userName,level)} >Start</Button>
                </Modal.Footer>
            </Modal>
        )
    )
}

export default StartMenu
