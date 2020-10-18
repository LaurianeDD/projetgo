import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button, ListGroup, Container, Image, Dropdown, DropdownButton } from "react-bootstrap";
import moment from 'moment';
import { useLocation } from "react-router-dom";
import EditProjects from "./EditProjects";
import { storage } from "../../firebase";
import { AuthContext } from '../context/AuthContext/AuthContext';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';


function ProjetDetails({ match }) {
  const { state: { user, member } } = useContext(AuthContext);
  const [currentProject, setCurrentProject] = useState({});
  const isCurrentUserResponsable = currentProject.responsable === user.user_id;

  const memberId = member.user_id;
  const projetId = match.params.projectId;
  //Adding and deleting members and volunteers
  const location = useLocation();
  const [memberName, setMemberName] = useState('');
  const [memberID, setMemberID] = useState('');
  const [memberLocation, setMemberLocation] = useState('');
  const [benevoleLocation, setbenevoleLocation] = useState('')
  const [benevoleName, setBenevoleName] = useState('');
  const [benevoleID, setBenevoleID] = useState('');
  const [initialValueMember, setInitialValueMember] = useState(true);
  const [check, setCheck] = useState(true);


  const [arrayAddedAlreadyBenevoles, setArrayAddedAlreadyBenevoles] = useState([]);

  //Searching for new members to add
  const [arrayMembersDB, setArrayMembersDB] = useState([]);


  const [arrayBenevolesDB, setArrayBenevolesDB] = useState([]);

  const [arrayAddedAlreadyMembers, setArrayAddedAlreadyMembers] = useState([]);

  //Adding members from the list
  const handleChangeMember = event => {
    setMemberLocation(event.target.value);
    const newMember = { name: arrayMembersDB[event.target.value].name, id: arrayMembersDB[event.target.value].id };
    setMemberName(newMember.name);
    setMemberID(newMember.id);
    setInitialValueMember('');
  }

  const handleChangeBenevole = event => {
    setbenevoleLocation((event.target.value));
    const newMember = { name: arrayBenevolesDB[event.target.value].name, id: arrayBenevolesDB[event.target.value].id };
    setBenevoleName(newMember.name);
    setBenevoleID(newMember.id);

  }


  function ajouterMembre() {
    let check = true;
    arrayAddedAlreadyMembers.map((member) => {
      if (member.id === memberID) {
        alert("inside if");
        check = false;
      }
    });
    if (check === true) {

      const newListWithAdd = arrayAddedAlreadyMembers.concat({ name: memberName, id: memberID });
      setArrayAddedAlreadyMembers(newListWithAdd);

    } else {
      alert("You have already added this person");
    }
  }

  function supprimerMember(memberLocation) {
    let index = arrayAddedAlreadyMembers.findIndex(obj => obj.id === memberLocation);

    const memberToErase = arrayAddedAlreadyMembers[index].name;

    const newArray = arrayAddedAlreadyMembers.filter(member => member.name !== memberToErase)


    setArrayAddedAlreadyMembers(newArray);
  }

  const listToAddMembers = (
    <Form.Control as="select" onChange={handleChangeMember}>
      <option value=''>Choisissez un membre</option>
      {arrayMembersDB.map((option, id) =>
        <option value={id} key={id}>
          {option.nom} {option.prenom}
        </option>
      )}
    </Form.Control>
  );

  const listofAlreadyAddedMembres = (
    <ListGroup>
      {arrayAddedAlreadyMembers.map((membres) =>

        <ListGroup.Item key={membres.id}>
          {membres.nom} {membres.prenom}  <Button onClick={() => supprimerMember(membres.id)} className="mb-2" variant="info">-</Button>
        </ListGroup.Item>
      )}
    </ListGroup>
  );



  function ajouterBenevole() {
    let check = true;
    arrayAddedAlreadyBenevoles.map((benevole) => {
      if (benevole.id === benevoleID) {
        alert("inside if");
        check = false;
      }
    });
    if (check === true) {

      const newListWithAdd = arrayAddedAlreadyBenevoles.concat({ name: benevoleName, id: benevoleID });
      setArrayAddedAlreadyBenevoles(newListWithAdd);
      //const newListWithDelete =arrayMembersDB.filter(member => member.name !== memberName)
      //setArrayMembersDB(newListWithDelete);
      //arrayMembersDB.splice(memberLocation,1);
    } else {
      alert("You have already added this person");
    }
  }

  function supprimerBenevole(benevoleLocation) {
    let index = arrayAddedAlreadyBenevoles.findIndex(obj => obj.id === benevoleLocation);

    const benevoleToErase = arrayAddedAlreadyBenevoles[index].name;

    const newArray = arrayAddedAlreadyBenevoles.filter(benevole => benevole.name !== benevoleToErase)


    setArrayAddedAlreadyBenevoles(newArray);
  }




  const listAddBenevoles = (
    <Form.Control as="select" onChange={handleChangeBenevole}>
      <option value='' disabled selected>Choisissez un bénévole</option>
      {arrayBenevolesDB.map((option, id) =>
        <option value={id} key={id}>
          {option.nom} {option.prenom}
        </option>
      )}
    </Form.Control>
  );

  const listNomsBenevoles = (
    <ListGroup>
      {arrayAddedAlreadyBenevoles.map((benevole) =>
        <ListGroup.Item key={benevole.id}>
          {benevole.nom} {benevole.prenom} <Button onClick={() => supprimerBenevole(benevole.id)} className="mb-2" variant="info">-</Button>
        </ListGroup.Item>
      )}
    </ListGroup>
  );

  useEffect(() => {
    getProjectDetail()
  }, [])

  //Edit info part
  const handleSelect = (e) => {}
  
  const getProjectDetail = async () => {
    try {
      
      const response = await fetch(`http://localhost:5000/projects/${projetId}`);
      const jsonData = await response.json();
      setCurrentProject(jsonData);

      // const responseMembre = await fetch(`http://localhost:5000/VoirMembreProjet/${projetId}`);
      // const jsonDataMembreList = await responseMembre.json();

      // setArrayAddedAlreadyMembers(jsonDataMembreList);

      // const responseBenevole = await fetch(`http://localhost:5000/VoirBenevoleProjet/${projetId}`);
      // const jsonDataBenevoleList = await responseBenevole.json();
      // setArrayAddedAlreadyBenevoles(jsonDataBenevoleList)


      // const responseAllMembre = await fetch(`http://localhost:5000/allMembers/${projetId}`);

      // const jsonDataAllMemberList = await responseAllMembre.json();
      // setArrayMembersDB(jsonDataAllMemberList);

      // const responseAllBenevole = await fetch(`http://localhost:5000/allBenevoles/${projetId}`);

      // const jsonDataAllBenevoleList = await responseAllBenevole.json();
      // setArrayBenevolesDB(jsonDataAllBenevoleList);

    } catch (err) {
      console.log(err.message);
    }
  }

  const handleChange = e => {

    // if (e.target.files[0]) {
    //   setNomImage(e.target.files[0]);
    // }
  };
  useEffect(() => {
    getProjectDetail();
  }, []);

  const handleEdit = async (event) => {
    const uploadTask = storage.ref(`images/${currentProject.image}`).put(currentProject.nameimg);
    uploadTask.on(
      "state_changed",
      snapshot => {
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(currentProject.nameimg)
          .getDownloadURL()
          .then(async image => {
            try {
              const responsable = member.user_id;
              const body = currentProject;

              const response = await fetch("http://localhost:5000/editProjet/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
              });
              const jsonData = await response.json();
              if (jsonData) {
                alert("Edit sucessful");

              } else {
                alert("Please try again");
              }
            } catch (err) {
              console.log(err.message);
            }
          });
      }
    )
    event.preventDefault();

  }


  return (

    <Container style={{ textAlign: 'left' }} >
      <Col>
        <div style={{ fontSize: '18px' }}>
          <Row className="px-3">

            <h1>{currentProject.titre}</h1>
            {isCurrentUserResponsable && (
              <EditProjects content={currentProject.titre} setContent={() => {}} />
            )}

            <p>{currentProject.description}</p>
            {isCurrentUserResponsable && (
              <EditProjects content={currentProject.description} setContent={() => {}} />
            )}
          </Row>
          <Row>
            <Col className="mr-4" lg={5} sm={12}>
              <Image fluid src={currentProject.image} />
              {isCurrentUserResponsable && (
                <input type="file" onChange={handleChange} className="btn btn-info btn-circle btn-sm" id="exampleFormControlFile1" />
              )}
            </Col>
            <Col className="mr-4" lg={6} sm={12}>
              <p>{currentProject.sommaire}</p>
              {isCurrentUserResponsable && (
                <EditProjects content={currentProject.sommaire} setContent={() => { }} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
            <Col>
              {isCurrentUserResponsable && (
                <div style={{ display: 'inline-block' }}>
                  <DropdownButton style={{ float: 'left' }} variant="info" onSelect={handleSelect} id="dropdown-basic-button" title="Statut Project">
                    <Dropdown.Item eventKey="Proposé">Proposé</Dropdown.Item>
                    <Dropdown.Item eventKey="Soumis">Soumis</Dropdown.Item>
                    <Dropdown.Item eventKey="Approuvé">Approuvé</Dropdown.Item>
                    <Dropdown.Item eventKey="Actif">Actif</Dropdown.Item>
                    <Dropdown.Item eventKey="Terminé">Terminé</Dropdown.Item>
                    <Dropdown.Item eventKey="Gelé">Gelé</Dropdown.Item>
                  </DropdownButton>
                  <span style={{ float: 'right' }} className="pl-2 pt-2">{currentProject.statutprojet}</span>
                </div>
              )}
            </Col>
          </Row><br />
          <Row>
            <Col>
              <p><b>Date début estimée:</b> {moment(currentProject.debutestime).format('ll')}</p>
            </Col>
            <Col>
              <p><b>Date fin estimé:</b> {moment(currentProject.finestime).format('ll')}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p><b>Montant amassé:</b> {currentProject.totalfondscoll}</p>
            </Col>
          </Row><br />


        </div><br />
        {isCurrentUserResponsable && (

        <div className="AjouterMembres" >
          <Container>
            <Row>
              <Col>
                {listToAddMembers}<br />
                <Button className="mb-2" style={{ minWidth: '200px' }} variant="info" onClick={ajouterMembre}><b>+ </b>Ajouter</Button><br />
                {listofAlreadyAddedMembres}
              </Col>


              <Col>
                {listAddBenevoles}<br />
                <Button className="mb-2" style={{ minWidth: '200px' }} variant="info" onClick={ajouterBenevole}><b>+ </b>Ajouter</Button><br />
                {listNomsBenevoles}
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <ButtonPG
                  size="lg"
                  onClick={handleEdit}
                >
                  Enregistrer
                </ButtonPG>

                <ButtonPG
                  size="lg"
                >
                  Supprimer Projet
                </ButtonPG>
              </Col>
            </Row>
          </Container>
        </div>
        )}
      </Col>
    </Container>
  )
}


export default ProjetDetails;