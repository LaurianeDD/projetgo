import React from 'react';

export default function ProjectContainer({ match }) {
  return (
    <Card>
      <Card.Header>
        <Nav 
          variant="tabs" 
          defaultActiveKey="#details"
        >
          <Nav.Item>
            <Nav.Link href={`${match.url}/details`}>
              Détails
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`${match.url}/reports`}>
              Rapports
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`${match.url}/fundraising`}>
              Campagnes
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {/* 
          Should contain either 

          <ProjectDetails />
          <ProjectReports />
          <ProjectFundraisings />

          depending on the selected tab
        */}
        
      </Card.Body>
    </Card>
  );
}