import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row, Button, InputGroup, FormControl, ListGroup, Nav } from "react-bootstrap";
import { Modal, ModalBody } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  // const history = useHistory();
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    erroMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  const handleFormSubmit = async (event) => {

    // Check whether the password and username are correct by sending the request to the backend.
    event.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const resJson = await response.json();
        dispatch({
          type: 'LOGIN',
          payload: resJson,
        });
      } else {
        throw response;
      }      
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText,
      });
    }

  }


  const [credentials, setCredentials] = useState('');

  // function searchCredentials(jsonData) {
  //   // If the password and username are correct, true will be returned from the backend.
  //   // If true, then the username will be kept and the pageNumber will be set to 2, displaying
  //   // the welcome sign.
  //   // If not, the warning sign will be set.
  //   const checkResult = jsonData.check;
  //   if (checkResult == true) {
  //     console.log(jsonData.userID);
  //     props.setLoggedInMemberID(jsonData.userID);
  //     props.setLoggedin(true);
  //     history.push('/welcome');
  //   } else {
  //     setCredentials('\n' + 'E-mail ou mot de passe incorret, veuillez réessayer.');
  //   }

  // }


  return (
    <>
      <Nav.Link onClick={() => setShow(true)}>
        LOGIN
      </Nav.Link>
    
      <Modal
        className="login"
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header >
          <Modal.Title>
            Connexion
          </Modal.Title>
        </Modal.Header>

        <ModalBody>
          <Form
            className="m-5"
            onSubmit={handleFormSubmit}
          >
            <Form.Group className="mx-5 mb-4">
              <Form.Control
                className="px-5"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Courriel"
              />
            </Form.Group>
            <Form.Group className="mx-5 mb-4">
              <Form.Control
                className="px-5"
                type="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Mot de passe"
              />
            </Form.Group>
          </Form>
          {data.erroMessage && (
            <span className="error">{data.erroMessage}</span>
          )}
        </ModalBody>

        <Modal.Footer>
          <ButtonPG
            className="btn-go"
            text={data.isSubmitting ? ('...') : ('GO')}
            variant="orange"
            type='submit'
            disabled={data.isSubmitting}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}