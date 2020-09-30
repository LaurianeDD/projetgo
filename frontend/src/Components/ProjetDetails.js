import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, InputGroup, ListGroup, Container, Breadcrumb, Image} from "react-bootstrap";



function ProjetDetails(props){
    const [listProjects, setListProjects]=useState('');


    return(

        <Container >
            <Breadcrumb >
                <Breadcrumb.Item href="#">Projets</Breadcrumb.Item>
                <Breadcrumb.Item active>Projet X</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form style={{textAlign:'left'}}>
                <Row>
                    <div id="heading">Heading</div><br/><br/>
                    <div id="descriptionCourte"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis commodi cum dicta, distinctio dolor dolore eligendi excepturi exercitationem fugiat id in labore laudantium magnam non, optio quaerat reprehenderit ut!</p></div>
                </Row><br />
                <Row>

                </Row>

            </Form><br /><br />


        </Container>

    )
}

export default ProjetDetails;


