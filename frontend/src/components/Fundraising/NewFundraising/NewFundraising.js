import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ButtonPG from '../../Buttons/ButtonPG/ButtonPG';

export default function NewFundraising({cancelClick}) {
  const initialState = {
    projectId: null,
    begin: null,
    end: null,
    goal: null,
  }

  const [data, setData] = useState(initialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Write request
      const response = await fetch('http://localhost:5000/projet/:id_projet/campaign', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: data.projectId,
          begin: data.begin,
          end: data.end,
          goal: data.goal,

        }),
      });

      setData(initialState);

    } catch (error) {
      console.error('Failed to submit new campaign');
    }
  };

  
  
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Row>
        <Col sm={3}>
          <Form.Label
            htmlFor="inlineFormInputBegin"
          >
            Début
          </Form.Label>
          <Form.Control
            className="mb-2"
            type="date" 
            id="begin"
            name="begin"
            value={data.begin}
            onChange={handleChange}
          />
        </Col>
        <Col sm={3}>
          <Form.Label
            htmlFor="inlineFormInputEnd"          
          >
            Fin
          </Form.Label>
          <Form.Control
            className="mb-2"
            type="date"
            id="end"
            name="end"
            value={data.end}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Label
            htmlFor="inlineFormInputAmount"
          >
            Objectif
          </Form.Label>
          <InputGroup
            className="mb-2"
          >
            <Form.Control
              type="number" 
              id="amount"
              min="5" 
              placeholder="Montant"
              name="goal"
              value={data.goal}
              onChange={handleChange}
            />
            <InputGroup.Append>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Row>
      <Form.Row>
        <Link to="projectDetail/:projectId/funds" />
        <ButtonPG
          text="Valider"
          size="sm"
          variant="teal"
          type="submit"
        />
      </Form.Row>
    </Form>
  );
}