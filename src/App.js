
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Globe from 'react-globe.gl';
import Input from './components/Input';
import { getColour } from './helper';
import {famousCountries} from "./helper"
import Modal from './components/Modal';

const countryData = require("./data/country_data.json").features 


function App() {

  const [correctAnswer, setCorrectAnswer] = useState({});
  const [guesses, setGuesses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [win, setWin] = useState(false);
  

  const size = 600;

  const startNewGame = () => {
    resetGameState(); // Reset the states for a new game
    const filteredCountries = countryData.filter((country) =>
      famousCountries.includes(country.properties.NAME_LONG)
    );
    if (filteredCountries.length > 0) {
      const newAnswer = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
      setCorrectAnswer(newAnswer);
    }
    setIsModalOpen(false);
  };

  const resetGameState = () => {
    setError("");
    setCurrentGuess("");
    setWin(false);
    setGuesses([]);
  };


  function getLabel(country) {
    const name = country.properties.ADMIN;
    const label = `<b class="tooltip">${name}</b>`;
    return label;
  }

  function polygonColour(country) {


    // return "yellow"
    return getColour(
      country,
      correctAnswer
    );

    // const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    // const randomIndex = Math.floor(Math.random() * colors.length);
    // return colors[randomIndex];
  }

  function polygonSideColor(country) {
    return "black"
  }

  function getAltitude(country) {
    return 0.05
  }


  const globeEl = useRef();

  useEffect(() => {
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    setTimeout(() => {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 1.6 });
    }, 400);
  }, [globeEl]);

  useEffect(()=>{
    
    const newGuess = [...guesses].pop(); 
    if(newGuess){
      const guessedCountry = countryData.find(country => country.properties.ADMIN === newGuess.properties.ADMIN);
      console.log(guessedCountry, " ----->")
      if (guessedCountry) {

        // Move the globe to the guessed country
        const { bbox } = guessedCountry;
        const lat =bbox[1] + (bbox[3] -bbox[1]) / 2; // Center latitude
        const lng =bbox[0] + (bbox[2] -bbox[0]) / 2; // Center longitude
        
        const controls = globeEl.current.controls();
        controls.autoRotate = false;
        globeEl.current.pointOfView({ lat, lng, altitude: 1.6 }, 1000); // Move smoothly over 1 second
      }
    }
    
  }, [guesses, globeEl])

  useEffect(() => {
    if (globeEl.current) {
      // Disable zooming
      globeEl.current.controls().enableZoom = false;
    }
  }, []);


  useEffect(()=>{
    const filteredCountries = countryData.filter(country => 
      famousCountries.includes(country.properties.NAME_LONG)
    );
    if (filteredCountries.length > 0) {
      const answer = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
      setCorrectAnswer(answer);
    }
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  console.log("Correct answer: ", correctAnswer?.properties?.NAME_EN)
  console.log(guesses)

  return (
    <div className="App">

      <Input guesses={guesses}
        setGuesses={setGuesses}
        correctAnswer={correctAnswer}
        onWin={toggleModal}
        error={error}
        setError={setError}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        win={win}
        setWin={setWin}/>
      <div 
      className="globe"
      >
      <Globe
       ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundColor="#00000000"
      polygonsData={guesses}
      polygonLabel={getLabel}
      polygonCapColor={polygonColour}
      polygonSideColor={polygonSideColor}
      polygonAltitude={getAltitude}
      polygonStrokeColor={() => 'black'}
      height={size}
      width={size}
      enableZoom={false}
    />
      </div>
     <Modal isOpen={isModalOpen} onClose={toggleModal} onStartNewGame={startNewGame}/>
    </div>
  );
}

export default App;
