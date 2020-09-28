import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Image, Button, Badge } from "react-bootstrap";


function AfficherMessage(props){
    function Capitalize(str){
        return str.toUpperCase();
    }
    function changePage(){
        props.setPageNumber(3);
    }
    return(

        <Container>
            <Row className="text-center">
                <Col xs={12} md={6} lg={5} >
                    <Image fluid src='./images/avatar_woman.png' />

                </Col>

                <Col className="p-4" xs={12} md={6} lg={7}>
                    <h1 style={{letterSpacing: 3}}>Bon retour</h1>
                    <h1 style={{letterSpacing: 3}}>{props.memberSpecific.name+" " +props.memberSpecific.lastName} !</h1><br />
                    <Badge className="badge badge-warning p-3 px-5" >{Capitalize(props.memberSpecific.status)}</Badge>
                </Col>
            </Row>
            <Button style={{background:"orange"}} className="px-5 btn btn-danger mb-4" variant="primary" type="submit" onClick={changePage}>
                SPACE MEMBRE
            </Button>

        </Container>

    );
}

export default AfficherMessage;
