import React, { useState, useEffect } from 'react';
import './LetterColorButton.css';

const LetterColorButton = (props) => {
    const { onClick, letter, colorValue } = props;
    const buttonColors = ['grey', 'yellow', 'green'];
    return (
        <button
            className={'letterColorButton'}
            onClick={onClick}
            style={{ backgroundColor: buttonColors[colorValue] }}
        >
            {letter?.toUpperCase()}
        </button>
    )

}

export default LetterColorButton;