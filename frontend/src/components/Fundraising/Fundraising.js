import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import DonationsListing from './DonationsListing/DonationsListing';
import NewFundraising from './NewFundraising/NewFundraising';

export default function Fundraising() {
  const [currentCampaign, setCurrentCampaign] = useState({});
  const [showCreateNew, setShowCreateNew] = useState(false);

  const cancelNew = () => {
    setShowCreateNew(false);
  }
  
  const handleCreateClick = () => {
    setShowCreateNew(true);
  };
  
  //Need the fundraising for this project if exist
  useEffect();
  
  return (
    <Container>
      <Row>
        {
          currentCampaign ?
          <Campaign /> : 
          <ButtonPG 
            text="Créer une campagne"
            variant="orange"
            size="lg"
            onClick={handleCreateClick}
          />
        }
      </Row>
      {
        showCreateNew ?
        <Row>
          <NewFundraising cancelClick={cancelNew} />
        </Row> :
        <></>
      }
      <Row>
        <Col>
          <DonationsListing />
        </Col>
      </Row>
    </Container>
  );
}