import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Image, Button, Badge } from "react-bootstrap";

function SpaceMembre(props){
    return(

        <Container>
            <Row>
                <Col style={{textAlign: 'left'}} xs={12} md={6} lg={7} >
                    <p>Prenom : {props.memberSpecific.lastName}</p>
                    <p>Nom : {props.memberSpecific.name}</p>
                    <p>Adresse :  {props.memberSpecific.adresse}</p>
                    <p>Code Postal: {props.memberSpecific.codePostal} </p>
                    <p>Ville : {props.memberSpecific.ville}</p>
                    <p>Province : {props.memberSpecific.province}</p>
                    <p>Pays : {props.memberSpecific.pays}</p>
                    <p>Membre depuis : </p>

                </Col>

                <Col className="p-4" xs={12} md={6} lg={4}>
                    <Image fluid src='./images/avatar_woman.png' />
                </Col>
            </Row>
        </Container>
    )
}

export default SpaceMembre;