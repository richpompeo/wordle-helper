import React, { useState, useEffect } from 'react';
import { allWords } from '../utils/wordBank';

const Home = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [submittedGuess, setSubmittedGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [wordList, setWordList] = useState(allWords);
    const [displayWordList, setDisplayWordList] = useState([]);

    const [valueForRemoveWordsWith, setValueForRemoveWordsWith] = useState('');
    const [valueForRetainWordsWith, setValueForRetainWordsWith] = useState('');
    const [dataForRetainWordsWithLetterAt, setDataForRetainWordsWithLetterAt] = useState({ letter: '', index: 0 });

    const [v0, setV0] = useState(0);
    const [v1, setV1] = useState(0);
    const [v2, setV2] = useState(0);
    const [v3, setV3] = useState(0);
    const [v4, setV4] = useState(0);


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
            wordListSynchronous = bigBrainFunction(currentGuess, [v0, v1, v2, v3, v4]);
            setDisplayWordList(wordListSynchronous.map((word, index) => <Item value={word} key={index}/>))
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
             *  is intended to handle plain "green" letters (as opposed to
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
                <br />
                Letter Color:
                <input
                    style={{ maxWidth: 25 }}
                    type="number"
                    maxLength={1}
                    value={v0}
                    onChange={(event) => setV0(parseInt(event.target.value))}
                />
                <input
                    style={{ maxWidth: 25 }}
                    type="number"
                    maxLength={1}
                    value={v1}
                    onChange={(event) => setV1(parseInt(event.target.value))}
                />
                <input
                    style={{ maxWidth: 25 }}
                    type="number"
                    maxLength={1}
                    value={v2}
                    onChange={(event) => setV2(parseInt(event.target.value))}
                />
                <input
                    style={{ maxWidth: 25 }}
                    type="number"
                    maxLength={1}
                    value={v3}
                    onChange={(event) => setV3(parseInt(event.target.value))}
                />
                <input
                    style={{ maxWidth: 25 }}
                    type="number"
                    maxLength={1}
                    value={v4}
                    onChange={(event) => setV4(parseInt(event.target.value))}
                />
                <br />
                Letter Color Inputs: {[v0, v1, v2, v3, v4]}
                <br />
                Current Guess: {currentGuess}
                <br />
                Submitted Guess: {submittedGuess}
                <br />
                <p>Number of 5 Letter Words Left: <b>{wordList.length}</b></p>
            <ul>
                {displayWordList}
            </ul>
            </form>
        )

    }


    export default Home;
