import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";


function ChoixMembership(props) {

    const history = useHistory();

    const [item, setItem] = useState({ choixMembership: ""});
    const { choixMembership } = item;

    const handleChange = e => {
        e.persist();

        setItem(prevState => ({
            ...prevState,
            choixMembership: e.target.value
        }));

        //props.choix(e.target.value);
    };

    //check if null/empty/etc
    function disableButton(){
        return (item.choixMembership)
    }

    return (
        <div style={{backgroundColor: '#138499', fontSize:'30px', color:"white"}}>
            <Form style={{margin:"auto"}}>
                        <Form.Group controlId={"choixMembership"} className={"m8"}>
                            <Col>
                                <Form.Check
                                    name="temp"
                                    value="/inscription-benevole"
                                    type="radio"
                                    label="Devenir un bénévole"
                                    onChange={handleChange}
                                    checked={choixMembership === "/inscription-benevole"}
                                    className="mx-5 mb-5"
                                    style={{margin:"20px 10px 20px 10px"}}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    name="temp"
                                    value="/inscription-membre"
                                    type="radio"
                                    label="Devenir un membre"
                                    onChange={handleChange}
                                    checked={choixMembership === "/inscription-membre"}
                                    className="mx-5 mb-5"
                                    style={{margin:"20px 10px 20px 10px"}}
                                />
                            </Col>
                        </Form.Group>

                        <Button style={{background:"orange",margin:"0px 10px 20px 10px"}} className="px-5" disabled={!disableButton()} onClick={(e)=>{history.push(choixMembership)}}>
                            Go
                        </Button>
            </Form>
        </div>
    )
}

export default ChoixMembership;