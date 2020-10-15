import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPG.css';

/*
  BUTTON for projet Go
  Takes a string: as text on the button
  Takes a variant: orange or teal
  Takes a function: as handleClick
*/
export default function ButtonPG({text, variant, handleClick}) {

  return (
    <Button
      variant={variant}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

export default ButtonDonation;
