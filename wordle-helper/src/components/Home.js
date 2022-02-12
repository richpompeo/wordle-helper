import React, { useState } from 'react';

const Home = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);

    const handleSubmit = (event) => {
        console.log('handleSubmit', event);
        event.preventDefault();
        if(currentGuess !== '') {
            setGuesses([...guesses, currentGuess])
        }
    }
    
    const handleClearForm = () => {
        document.getElementById("main-form").reset();
        setCurrentGuess('')
        setGuesses([])
    }

    const handleNameChange = (event) => {
        console.log('handleNameChange', event);
        event.preventDefault();
        setCurrentGuess(event.target.value);
    }

    const Item = (props) => {
        return <li>{props.value}</li>;
    }

    return (
        <form 
        id="main-form"
        onSubmit={e => handleSubmit(e)}>
            <label>
                Add Guess:
                <input
                    type="text"
                    name="name"
                    value={currentGuess}
                    onChange={handleNameChange}
                />
            </label>
            <input type="submit" value="Submit" />
            <button onClick={handleClearForm}>Clear</button>
            <ul>
                {guesses.map((guess) => <Item value={guess} />)}
            </ul>

        </form>
    )

}



export default Home;
