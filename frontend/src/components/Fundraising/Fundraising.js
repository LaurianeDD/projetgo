import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import DonationsListing from './DonationsListing/DonationsListing';

export default function Fundraising() {
  //Need the fundraising for this project if exist

  const handleCreateClick = () => {};

  return (
    <Container>
      <Row>
        <Col>
          {/*
            Current fundraising || 
            <ButtonPG 
              text="Créer une campagne"
              variant="orange"
              size="lg"
              onClick={handleCreateClick}
            >
          */}
        </Col>
      </Row>
      <Row>
        <Col>
          <DonationsListing />
        </Col>
      </Row>
    </Container>
  );
}