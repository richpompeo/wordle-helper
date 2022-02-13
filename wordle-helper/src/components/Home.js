import React, { useState, useEffect } from 'react';
import { allWords } from '../utils/wordBank';

const Home = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [submittedGuess, setSubmittedGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [previousDisplayWordLists, setPreviousDisplayWordLists] = useState([]);
    const [wordList, setWordList] = useState(allWords);
    const [displayWordList, setDisplayWordList] = useState([]);

    const [valueForRemoveWordsWith, setValueForRemoveWordsWith] = useState('');
    const [valueForRetainWordsWith, setValueForRetainWordsWith] = useState('');
    const [dataForRetainWordsWithLetterAt, setDataForRetainWordsWithLetterAt] = useState({ letter: '', index: 0 });


    const buttonColors = ['grey', 'yellow', 'green']
    const [b0, setB0] = useState(0);
    const [b1, setB1] = useState(0);
    const [b2, setB2] = useState(0);
    const [b3, setB3] = useState(0);
    const [b4, setB4] = useState(0);

    const updateLetterColorButtonB0 = (event) => {
        console.log('updateLetterColorButton', (b0 + 1) % 3);
        event.preventDefault();
        setB0((b0 + 1) % 3);
    }
    const updateLetterColorButtonB1 = (event) => {
        console.log('updateLetterColorButton', (b1 + 1) % 3);
        event.preventDefault();
        setB1((b1 + 1) % 3);
    }
    const updateLetterColorButtonB2 = (event) => {
        console.log('updateLetterColorButton', (b2 + 1) % 3);
        event.preventDefault();
        setB2((b2 + 1) % 3);
    }
    const updateLetterColorButtonB3 = (event) => {
        console.log('updateLetterColorButton', (b3 + 1) % 3);
        event.preventDefault();
        setB3((b3 + 1) % 3);
    }
    const updateLetterColorButtonB4 = (event) => {
        console.log('updateLetterColorButton', (b4 + 1) % 3);
        event.preventDefault();
        setB4((b4 + 1) % 3);
    }

    const resetButtonsAndGuess = () => {
        console.log('resetButtonsAndGuess');
        setB0(0);
        setB1(0);
        setB2(0);
        setB3(0);
        setB4(0);
        setCurrentGuess('')
    }


    const bigBrainFunction = (word, letterColors) => {
        let data = packageData(word, letterColors);
        let wordListFiltered = [...wordList];
        console.log('data', data)
        console.log(Object.keys(data))
        // 0 = black
        // 1 = yellow
        // 2 = green
        for (let key in data) {
            let color = data[key][0].color
            let index = data[key][0].index

            if(data[key].length > 1) {
                for (let i = 0; i < data[key].length; i++) {
                    if (data[key][i].color > color) {
                        color = data[key][i].color
                        index = data[key][i].index
                    }
                    
                }
            }


            switch (color) {
                case 0:
                wordListFiltered = removeWordsWith(wordListFiltered, key);
                    break;
                case 1:
                    wordListFiltered = retainWordsWithLetterButNotAt(wordListFiltered, key, index)
                    break;
                case 2:
                    wordListFiltered = retainWordsWithLetterAt(wordListFiltered, key, index)
                    break;

                default:
                    break;
                }

        }
        setWordList(wordListFiltered)
            return wordListFiltered;
        }

        const packageData = (word, letterColors) => {
            console.log('word', word);
            console.log('letterColors', letterColors);
            console.log([...word])
            const wordLetters = [...word.toLowerCase()];
            let final = {};
            for (let i = 0; i <= 4; i++) {
                let letter = wordLetters[i];
                let color = letterColors[i];
                console.log('letter', letter)
                console.log({ 'color': color, 'index': i })
                if (final.hasOwnProperty(letter)) {
                    final[letter] = [...final[letter], { 'color': color, 'index': i }]
                } else {
                    final[letter] = [{ 'color': color, 'index': i }]
                }
            }
            console.log('final', final)



            return final;
        }


        const handleSubmit = (event) => {
            let wordListSynchronous = []
            console.log('handleSubmit', event);
            event.preventDefault();
            setSubmittedGuess(currentGuess);
            setPreviousGuesses([...previousGuesses, [currentGuess, [b0, b1, b2, b3, b4]]]) // <-- to be displayed as previous guesses
            wordListSynchronous = bigBrainFunction(currentGuess, [b0, b1, b2, b3, b4]);
            setDisplayWordList(wordListSynchronous.map((word, index) => <Item value={word} key={index}/>));
            setPreviousDisplayWordLists([...previousDisplayWordLists,wordListSynchronous]) // <-- for future "undo" button
            
            resetButtonsAndGuess();
            // if (currentGuess !== '') {
            //     setGuesses([...guesses, currentGuess])
            // }
        }

        const handleClearForm = () => {
            document.getElementById("main-form").reset();
            setCurrentGuess('')
            setGuesses([])
        }

        const handleGuessChange = (event) => {
            event.preventDefault();
            setCurrentGuess(event.target.value);
        }

        const Item = (props) => {
            return <li>{props.value}</li>;
        }

        const removeWordsWith = (list, letter) => {
            /**
             * Remove words from list that have letter.  This function is 
             * intended to handle plain "black" letters (as opposed to a 
             * word a letter that has both a "black" and "yellow" letter,
             * or "black" and "green", etc...)
             * 
             * @param  {Object} list   List of remaining game words
             * @param  {String} letter All words containing this character should be removed
             * @return {Object}        List of remaining game words without letter
             */


            return list.filter((word) => !word.includes(letter));
        };

        const retainWordsWithLetterButNotAt = (list, letter, index) => {
            /**
             * Keep words in list that have letter, but remove words that
             * have letter at index. This function is intended to handle 
             * plain "yellow" letters (as opposed to a word a that has 
             * duplicate letters, one of which is "yellow").
             * 
             * @param  {Object} list   List of remaining game words
             * @param  {String} letter All words containing this character at index should be removed
             * @param  {Number} Index  All words containing character at index should be removed
             * @return {Object}        List of remaining game words containg letter, but without letter at index
             */

            list = list.filter((word) => word.includes(letter));
            list = list.filter((word) => word[index] !== letter);
            return list
        };

        const retainWordsWithLetterAt = (list, letter, index) => {
            /**
             * Keep words in list that have letter at index. This function
             * is intended to handle plain "green" letters (as opposed to
             * a word a that has duplicate letters, one of which is "green").
             * 
             * @param  {Object} list   List of remaining game words
             * @param  {String} letter All words containing this character at index should be kept
             * @param  {Number} Index  All words containing character at index should be kept
             * @return {Object}        List of remaining game words containg letter at index
             */
            return list.filter((word) =>  word[index] === (letter));
        };

        useEffect(() => {
        }, []);

        return (
            <div>
                <p><b>Instructions:</b> After making a guess on wordle, type in your guess below.
                    <br></br>
                    Then for each letter in your guess, tap the button below so that the colors 
                    <br></br>
                    match what wordle shows. Click submit to see the remaining wordle words! 
                </p>

                <form
                    id="main-form"
                    onSubmit={e => e.preventDefault()}
                >
                    <label>
                        Add Guess:
                        <input
                            type="text"
                            name="name"
                            maxLength={5}
                            value={currentGuess}
                            onChange={handleGuessChange}
                        />
                    </label>
                    {/* <input type="submit" value="Submit" /> */}
                    <button onClick={(e) => handleSubmit(e)}>submit guess</button>
                    <br></br>
                    Letter Colors:
                    <button onClick={(e) => updateLetterColorButtonB0(e)} style={{backgroundColor: buttonColors[b0]}}>{currentGuess[0]}</button>
                    <button onClick={(e) => updateLetterColorButtonB1(e)} style={{backgroundColor: buttonColors[b1]}}>{currentGuess[1]}</button>
                    <button onClick={(e) => updateLetterColorButtonB2(e)} style={{backgroundColor: buttonColors[b2]}}>{currentGuess[2]}</button>
                    <button onClick={(e) => updateLetterColorButtonB3(e)} style={{backgroundColor: buttonColors[b3]}}>{currentGuess[3]}</button>
                    <button onClick={(e) => updateLetterColorButtonB4(e)} style={{backgroundColor: buttonColors[b4]}}>{currentGuess[4]}</button>
                    <br />
                    Letter Color Inputs: {[b0, b1, b2, b3, b4]}
                    <br />
                    Current Guess: {currentGuess}
                    <br />
                    Submitted Guess: {submittedGuess}
                    <br />
                    Previous Guesses:
                    <ul>
                        {previousGuesses.map((word, index) => <Item value={word[0]} key={index}/>)}
                    </ul>
                    <p>Number of 5 Letter Words Left: <b>{wordList.length}</b></p>
                    <p>Words Left:</p>
                    <ul>
                        {displayWordList}
                    </ul>
                </form>
            </div>
        )

    }


    export default Home;
