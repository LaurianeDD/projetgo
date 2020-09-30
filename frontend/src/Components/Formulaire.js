import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row,Button,InputGroup,FormControl,ListGroup } from "react-bootstrap";


function Formulaire(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    const onSubmitForm=async(event)=> {
        event.preventDefault();
        try{

            const response = await fetch(`http://localhost:5000/login/${email}/${password}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();

            searchCredentials(jsonData);
        }catch(err){
            console.log(err.message);
        }

    }


    const [credentials,setCredentials]=useState('');

    function searchCredentials(jsonData){

        if (jsonData==true) {
            props.setMemberSpecific(email);
            props.setPageNumber(2);
        }else{
            setCredentials('Incorrect email or password, please try again.');
        }

    }


    return(
        <div style={{backgroundColor: '#138496'}}>
            <hr style={{backgroundColor: 'white '}}/>
                <h4 style={{color: 'white'}}>CONNEXION</h4>
            <hr style={{backgroundColor: 'white'}}/>
            <p style={{fontSize:"15px"}} >{credentials}</p>
            <Form onSubmit={onSubmitForm} className="m-5">
                <Form.Group className="mx-5 mb-4">
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} className="px-5" placeholder="Courriel" />
                </Form.Group>
                <Form.Group className="mx-5 mb-4">
                    <Form.Control  type="password" className="px-5"  placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button style={{background:"orange"}} className="px-5 btn btn-danger" type='submit'>
                    GO
                </Button>
            </Form>
        </div>





    )
}

export default Formulaire;

