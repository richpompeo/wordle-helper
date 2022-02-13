import React, { useState, useEffect } from 'react';
import { allWords } from '../utils/wordBank';

const DebugLogic = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [wordList, setWordList] = useState(allWords);

    const [valueForRemoveWordsWith, setValueForRemoveWordsWith] = useState('');
    const [valueForRetainWordsWith, setValueForRetainWordsWith] = useState('');
    const [dataForRetainWordsWithLetterAt, setDataForRetainWordsWithLetterAt] = useState({letter: '', index: 0});

    const handleSubmit = (event) => {
        console.log('handleSubmit', event);
        event.preventDefault();
        if (currentGuess !== '') {
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
        if (props.index < 500) {
            return <li>{props.value}</li>;
        }
        return null;
    }

    const removeWordsWith = (letter) => {
        setWordList(wordList.filter((word) => !word.includes(letter)));
    };

    const retainWordsWith = (letter) => {
        setWordList(wordList.filter((word) => word.includes(letter)));
    };

    const retainWordsWithLetterAt = (letter, index) => {
        setWordList(wordList.filter((word) => word[index] === (letter)));
    };


    useEffect(() => {
    }, []);

    return (
        <form
            id="main-form"
            onSubmit={e => handleSubmit(e)}
            >
            <label>
            removeWordsWith:
                <input
                    type="text"
                    name="name"
                    maxLength={1}
                    value={valueForRemoveWordsWith}
                    onChange={(event) => setValueForRemoveWordsWith(event.target.value)}
                />
            </label>
            <button onClick={() => removeWordsWith(valueForRemoveWordsWith)}>removeWordsWith</button>
            <br />
            <br />
            <label>
            retainWordsWith:
                <input
                    type="text"
                    name="name"
                    maxLength={1}
                    value={valueForRetainWordsWith}
                    onChange={(event) => setValueForRetainWordsWith(event.target.value)}
                />
            </label>
            <button onClick={() => retainWordsWith(valueForRetainWordsWith)}>retainWordsWith</button>
            <br />
            <br />
            <label>
            letter:
                <input
                    type="text"
                    name="name"
                    maxLength={1}
                    value={dataForRetainWordsWithLetterAt.letter}
                    onChange={(event) => setDataForRetainWordsWithLetterAt({ letter: event.target.value, index: dataForRetainWordsWithLetterAt.index})}
                />
            </label>
            <label>
            index:
                <input
                    type="number"
                    name="name"
                    maxLength={1}
                    value={dataForRetainWordsWithLetterAt.index}
                    onChange={(event) => setDataForRetainWordsWithLetterAt({ letter: dataForRetainWordsWithLetterAt.letter, index: event.target.value})}
                />
            </label>
            <button onClick={() => retainWordsWithLetterAt(dataForRetainWordsWithLetterAt.letter, dataForRetainWordsWithLetterAt.index)}>Retain by first letter === a</button>
            <p>wordList.length: <b>{wordList.length}</b></p>
            <p>{currentGuess}</p>
            {/* <ul>
                {guesses.map((guess, index) => <Item value={guess, index} />)}
            </ul> */}
            <ul>
                {wordList.map((word, index) => <Item value={word} index={index}/>)}
            </ul>
        </form>
    )

}


export default DebugLogic;
