import React, { useState, useEffect } from 'react';
import { allWords } from '../utils/wordBank';

const Home = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [wordList, setWordList] = useState(allWords);
    const [submittedGuess, setSubmittedGuess] = useState('');

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
                    wordListFiltered = retainWordsWith(wordListFiltered, key)
                    break;
                case 2:
                    wordListFiltered = retainWordsWithLetterAt(wordListFiltered, key, index)
                    break;

                default:
                    break;
                }

        }
        setWordList(wordListFiltered)
            return;
        }

        const packageData = (word, letterColors) => {
            console.log('word', word);
            console.log('letterColors', letterColors);
            console.log([...word])
            const wordLetters = [...word];
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
            console.log('handleSubmit', event);
            event.preventDefault();
            setSubmittedGuess(currentGuess);
            bigBrainFunction(currentGuess, [v0, v1, v2, v3, v4]);
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
            if (props.index < 500) {
                return <li>{props.value}</li>;
            }
            return null;
        }

        // const removeWordsWith = (letter) => {
        //     setWordList(wordList.filter((word) => !word.includes(letter)));
        // };

        // const retainWordsWith = (letter) => {
        //     setWordList(wordList.filter((word) => word.includes(letter)));
        // };

        // const retainWordsWithLetterAt = (letter, index) => {
        //     setWordList(wordList.filter((word) => word[index] === (letter)));
        // };

        const removeWordsWith = (list, letter) => {
            return list.filter((word) => !word.includes(letter));
        };

        const retainWordsWith = (list, letter) => {
            return list.filter((word) => word.includes(letter));
        };

        const retainWordsWithLetterAt = (list, letter, index) => {
            setWordList(wordList.filter((word) => word[index] === (letter)));
            return list.filter((word) =>  word[index] === (letter));
        };

        // const filterFunction = (excludedLetter) => {
        //     setWordList(allWords.filter((word) => !word.includes(excludedLetter)));
        // };

        useEffect(() => {
            console.log('allWords', allWords.length);
            // const foo = 
            // console.log(foo);
        }, []);
        console.log('RENDER');
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
                currentGuess: {currentGuess}
                <br />
                submittedGuess: {submittedGuess}
                <br />
                letter color:
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
                final output: {[v0, v1, v2, v3, v4]}
                {/* <label>
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
            <button onClick={() => retainWordsWithLetterAt(dataForRetainWordsWithLetterAt.letter, dataForRetainWordsWithLetterAt.index)}>Retain by first letter === a</button> */}
                <p>wordList.length: <b>{wordList.length}</b></p>
                {/* <ul>
                {guesses.map((guess, index) => <Item value={guess, index} />)}
            </ul> */}
                <ul>
                {wordList.map((word, index) => <Item value={word} index={index}/>)}
            </ul>
            </form>
        )

    }


    export default Home;
