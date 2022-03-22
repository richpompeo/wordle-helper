import React, { useState, useEffect } from 'react';
import { allWords } from '../utils/wordBank';
import {getCurrentPageCount, updateCurrentPageCount} from './AwsFunctions';
import ReactGA from 'react-ga4';


const Home = () => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [submittedGuess, setSubmittedGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [previousDisplayWordLists, setPreviousDisplayWordLists] = useState([]);
    const [wordList, setWordList] = useState(allWords);
    const [displayWordList, setDisplayWordList] = useState([]);
    const [currentPageCount, setCurrentPageCount] = useState(1337);

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

        const bigBrainFunction2 = (word, letterColors) => {
            let data = packageData(word, letterColors);
            let wordListFiltered = [...wordList];
            console.log('data', data)
            console.log(Object.keys(data))
            // 0 = black
            // 1 = yellow
            // 2 = green

            for (let key in data) {
                let color = null
                let index = null
                if (data[key].length === 1) { // only 1 letter
                    color = data[key][0].color
                    index = data[key][0].index

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
                else { // more than 1 letter
                    // go through each letter and color, performing different operations than single letter
                    // also count the number of "non black letters" in the current guess, then after the
                    // for loop, only keep words in the wordListFiltered that have exactly this count of 
                    // "non black letters"
                    let nonBlackLetterCount = 0
                    let blackLetterCount = 0
                    for (let i = 0; i < data[key].length; i++) {
                        color = data[key][i].color
                        index = data[key][i].index
                        if (color === 0) { blackLetterCount += 1 } 
                        else { nonBlackLetterCount += 1}

                        switch (color) {
                            case 0:
                            wordListFiltered = removeWordsWithLetterAt(wordListFiltered, key, index);
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

                    // if (blackLetterCount === 0) {
                    //     wordListFiltered = keepWordsWithAtLeastLetterCount(wordListFiltered, key, nonBlackLetterCount)
                    // } else {
                        // keep words that have exactly nonBlackLetterCount of letter
                        wordListFiltered = keepWordsWithExactLetterCount(wordListFiltered, key, nonBlackLetterCount)
                    // }
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
            ReactGA.event({
                category: "user action",
                action: "guess submitted",
              });
            tryUpdatingPageLoadCount() // count that user is on page today if not already counted
            if(handleInputValidation(currentGuess) === true) {
                console.log('handleSubmit', event);
                let wordListSynchronous = []
                setSubmittedGuess(currentGuess);
                setPreviousGuesses([...previousGuesses, [currentGuess, [b0, b1, b2, b3, b4]]]) // <-- to be displayed as previous guesses
                event.preventDefault();
                wordListSynchronous = bigBrainFunction2(currentGuess, [b0, b1, b2, b3, b4]);
                setDisplayWordList(makeListItems(wordListSynchronous));
                setPreviousDisplayWordLists([...previousDisplayWordLists,wordListSynchronous]) // <-- for future "undo" button
                resetButtonsAndGuess();
            }
            

        }

        const handleUndo = (event) => {
            ReactGA.event({
                category: "user action",
                action: "undo guess",
              });
            tryUpdatingPageLoadCount() // count that user is on page today if not already counted
            console.log('handleUndo', event);
            if (previousGuesses.length > 0) {
                previousGuesses.pop()
                previousDisplayWordLists.pop()
                // console.log(previousGuesses)
                // console.log(previousDisplayWordLists)
                setPreviousGuesses(previousGuesses)
                setPreviousDisplayWordLists(previousDisplayWordLists)
                if (previousDisplayWordLists.length === 0) {
                    setWordList(allWords)
                    setDisplayWordList([])
                } else {
                    setWordList(previousDisplayWordLists[previousDisplayWordLists.length-1])
                    setDisplayWordList(makeListItems(previousDisplayWordLists[previousDisplayWordLists.length-1]))
                }
            }
                
        }

        const handleReset = (event) => {
            ReactGA.event({
                category: "user action",
                action: "guess reset",
              });              
            tryUpdatingPageLoadCount() // count that user is on page today if not already counted
            console.log('handleReset', event);
            if (previousGuesses.length > 0) {
                setPreviousGuesses([])
                setPreviousDisplayWordLists([])
                setWordList(allWords)
                setDisplayWordList([])
                resetButtonsAndGuess();
            }
                
        }
                    

        const makeListItems = (list) => {
           return list.map((word, index) => <Item value={word} key={index}/>)
        }


        const handleInputValidation = (word) => {
            // the reason this is not returning false for each of the if statements then true at the end is to try to speed up
            // checking if the word is in the wordList b/c if it is, it should be faster than going through 12,000 words.
            if (word.length !== 5) {
                return false
            }

            if (allWords.includes(word.toLowerCase())) {
                return true
            }

            return false
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
            return list.filter((word) =>  word[index] === letter);
        };

        const removeWordsWithLetterAt = (list, letter, index)=> {
            /**
             * Remove words from list that have letter at index.  This function is intended to
             * handle "black" letters in a word that has more than one of these letters
             * 
             * @param  {Object} list   List of remaining game words
             * @param  {String} letter All words containing this character at index should be removed
             * @param  {Number} Index  All words containing this character at index should be removed
             * @return {Object}        List of remaining game words without letter at index
             */


            return list.filter((word) =>  word[index] !== letter);
        };



        // the following two functions can be noticably slow when a first guess of 'sissy' happens b/c there is a lot of
        // computations going on.  I think it should be rare that a person's first guess has multiple letters, but maybe
        // we could change this code to run faster for those scenarios.
        const countLettersInWord = (word, letter)=> {
            let letterCount = 0
            for (let i = 0; i <= 4; i++) {
                if (word[i] === letter) {
                    letterCount += 1
                }
            }
            return letterCount;
        };

        const keepWordsWithExactLetterCount = (list, letter, letterCount)=> {
            console.log('letter, letterCount', letter, letterCount)

            return list.filter((word) =>  countLettersInWord(word, letter) === letterCount);
        };

        const keepWordsWithAtLeastLetterCount = (list, letter, letterCount)=> {
            console.log('letter, letterCount', letter, letterCount)

            return list.filter((word) =>  countLettersInWord(word, letter) >= letterCount);
        };


        const setVisitedTodayCookie = () => {
            /**
             * sets cookie visited_today to 'True' and expires at midnight tonight utc time.
             * (same time that new wordle word updates)
             */
            let now_utc = new Date(); 
            let midnight_tonight_utc =  Date.UTC(now_utc.getUTCFullYear(), now_utc.getUTCMonth(), now_utc.getUTCDate(), 24, 0, 0);
            midnight_tonight_utc = new Date(midnight_tonight_utc).toUTCString()
            // console.log(midnight_tonight_utc)
            document.cookie = "visited_today=True; expires="+midnight_tonight_utc+"path=/;";
        }

        const getCookieValue = (cname) => {
             /**
             * returns string of cookie value.  If cookie not present, returns empty string
             */
            
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        }


    const tryUpdatingPageLoadCount = async () => {
        /**
         * this function will update the page load count in our database if the visited_today cookie is not set, 
         * otherwise it will not do anything
         */
        // console.log(getCookieValue('visited_today'));
        if (getCookieValue('visited_today') === '') { // page not visited yet today, update DB
            try {
                getCurrentPageCount().then(currentPageCount => {
                    updateCurrentPageCount(currentPageCount+1);
                 });
                setVisitedTodayCookie()
            } catch (error) {
                console.error('error updating page visit', error)
            } finally {
                return
            }
        } else { // page visited already today, do not update DB'
            // console.log('do not update DB')
            return
        }

    }
        
        useEffect(() => {
            getCurrentPageCount().then(currentPageCount => {
                setCurrentPageCount(currentPageCount);
             })
            tryUpdatingPageLoadCount()
            .catch(console.error)
        }, []); // on page load

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
                    <button onClick={(e) => handleSubmit(e)} style={{color: 'black'}}>submit guess</button>
                    <button onClick={(e) => handleUndo(e)} style={{color: 'black'}}>undo guess</button>
                    <button onClick={(e) => handleReset(e)} style={{color: 'black'}}>reset</button>
                    <br></br>
                    Letter Colors:
                    <button onClick={(e) => updateLetterColorButtonB0(e)} style={{backgroundColor: buttonColors[b0], color: 'black'}}>{currentGuess[0]}</button>
                    <button onClick={(e) => updateLetterColorButtonB1(e)} style={{backgroundColor: buttonColors[b1], color: 'black'}}>{currentGuess[1]}</button>
                    <button onClick={(e) => updateLetterColorButtonB2(e)} style={{backgroundColor: buttonColors[b2], color: 'black'}}>{currentGuess[2]}</button>
                    <button onClick={(e) => updateLetterColorButtonB3(e)} style={{backgroundColor: buttonColors[b3], color: 'black'}}>{currentGuess[3]}</button>
                    <button onClick={(e) => updateLetterColorButtonB4(e)} style={{backgroundColor: buttonColors[b4], color: 'black'}}>{currentGuess[4]}</button>
                    <br />
                    {/* Letter Color Inputs: {[b0, b1, b2, b3, b4]} */}
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
                    <p style={{marginTop: '20em'}}>Page Visitor Count: {currentPageCount}</p>
                </form>
            </div>
        )

    }


    export default Home;
