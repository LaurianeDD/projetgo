import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, InputGroup, ListGroup, Container, Breadcrumb, Image} from "react-bootstrap";



function ListerProjects(props){

    const myArray=[{"name":"Mi projecto","descripcion": " Lorem itatis vero voluptates voluptatibus.\n"},
        {"name":"Otro","descripcion": "laralalalala.\n"}];
    const [listProjects, setListProjects]=useState(myArray);


    return(

        <Container >
            <Breadcrumb >
                <Breadcrumb.Item href="#">Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Mes Projets</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form>
                {listProjects.map(projects=>
                    <div>
                        <Row>
                            <Col className="mr-4" lg={5} sm={12}>
                                <Image fluid src='./images/volunteer.jpg' />
                            </Col><br /><br />
                            <Col className="ml-4" lg={6} sm={12}>
                                <Row>
                                    <div><h2>{projects.name}</h2></div>
                                </Row><br />
                                <Row>
                                    <div style={{textAlign:'left', fontSize:'18px'}}>{projects.descripcion}</div>
                                </Row><br />
                                <Row>
                                    <Button style={{backgroundColor :'orange'}}>Details</Button>
                                </Row>
                            </Col>
                        </Row><br/>
                    </div>  )}
            </Form><br /><br />

        </Container>

    )
}

export default ListerProjects;


