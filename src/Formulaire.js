import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row,Button,InputGroup,FormControl,ListGroup } from "react-bootstrap";


function Formulaire(props) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    const [credentials,setCredentials]=useState('');

    function searchCredentials(){
        let entryCheck = false;

        props.membres.map(membre => {
            if (membre.emailDataBase === email && membre.passwordDataBase === password) {
                entryCheck = true;
                props.setMemberSpecific(membre);
            }
        });


        if(entryCheck){
            props.setPageNumber(2);
        }else{
            setCredentials('Incorrect email or password, please try again.');
        }

    }
    function Notification(){
        return credentials;
    }

    return(
        <div style={{backgroundColor: '#138496'}}>
            <hr style={{backgroundColor: 'white '}}/>
                <h4 style={{color: 'white'}}>CONNEXION</h4>
            <hr style={{backgroundColor: 'white'}}/>
            <p style={{fontSize:"15px"}} ><Notification/></p>
            <Form onSubmit={handleSubmit} className="m-5">
                <Form.Group className="mx-5 mb-4">
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} className="px-5" type="email" placeholder="Courriel" />
                </Form.Group>
                <Form.Group className="mx-5 mb-4">
                    <Form.Control  type="password" className="px-5"  placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button style={{background:"orange"}} className="px-5 btn btn-danger " variant="primary" type="submit" onClick={searchCredentials} disabled={!validateForm()}>
                    GO
                </Button>
            </Form>
        </div>





    )
}

export default Formulaire;

