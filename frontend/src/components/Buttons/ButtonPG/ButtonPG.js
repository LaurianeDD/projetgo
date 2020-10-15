import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPG.css';

/*
  BUTTON for projet Go
  Takes a string 
  Takes a variant: orange or teal
  Takes a handleClick 
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
