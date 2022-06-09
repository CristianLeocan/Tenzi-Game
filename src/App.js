import {useState, useEffect} from 'react';
import './index.css';
import Header from './components/Header/Header';
import Boxes from './components/Boxes/Boxes.js';
import {nanoid} from 'nanoid';
import Timer from './components/Timer/Timer';
import Confetti from 'react-confetti';
import Raking from './components/Ranking/Raking';


export default function App() {
  const [box, setBox] = useState(generateInitialBoxes());
  const [won, setWon] = useState(false);
  const [trys, setTrys] = useState(0);
  const [record, setRecord] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  
  useEffect(() => {
    const allBox = box.every(item =>item.isPressed);
    const firstValue = box[0].value;
    const allValue = box.every(item => item.value === firstValue);    
    if (allBox && allValue) {
        setWon(true);
     }
  }, [box])

  function generateNewBox() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isPressed: false,
      id: nanoid(),
    }
  }
  
  function generateInitialBoxes() {
    const boxes= [];    
    for (let i = 0; i < 10; ++i) {
      boxes.push(generateNewBox());
    }   
    return boxes;  
  }
  
  function structureOfBox(id) {
    if (intervalId) {
      setBox(prevBox => prevBox.map(box => {
        return box.id === id ? {...box, isPressed: !box.isPressed} : box
      }))
    }
  }
  
  const boxElements = box.map(valueGenerated => (    
    <Boxes 
      key={valueGenerated.id} 
      value={valueGenerated.value}
      isPressed={valueGenerated.isPressed}
      id={valueGenerated.id} 
      structureOfBox={() => structureOfBox(valueGenerated.id)}
    />
    ))
    
  function setGame() {
    if(!won) {
      if(intervalId) {
        setBox(prevBox => prevBox.map(box => {
          return box.isPressed ? 
          box :
          generateNewBox()
        }))
        setTrys(prevTrys => prevTrys + 1);
      }
    } else {
      setWon(false);
      setBox(generateInitialBoxes());    
      count = 0;

      //Set best time and smallest number of moves (rolls) to Local Storage 
      const storageMoves = JSON.parse(localStorage.getItem('moves'));
      const storageBestTime = JSON.parse(localStorage.getItem('bestTime'));

      if((seconds < storageBestTime) || (storageBestTime === 0) || (!storageBestTime)) {
        localStorage.setItem('bestTime', JSON.stringify(seconds)); 
        localStorage.setItem('moves', JSON.stringify(trys));
      } else if (seconds === storageBestTime && trys < storageMoves) {
        localStorage.setItem('moves', JSON.stringify(trys));
      }       
      setBestTime(localStorage.getItem('bestTime'));
      setSeconds(0);
      setMinutes(0);
      setTrys(0);
      setRecord(localStorage.getItem('moves'));
    }
  }

  useEffect(() => {
    setBestTime(localStorage.getItem('bestTime'));
  }, [])

  useEffect(() => {
      setRecord(localStorage.getItem('moves'));
  }, [])

  function removeStorage () {
    localStorage.clear();
  }

  //-----------------Timer----------------------
  const [seconds, setSeconds] = useState(0);  
  const [minutes, setMinutes] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  let count = 0;  

  const startStop = () => {
    if (intervalId) {
      count = seconds;      
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

  const newIntervalId = setInterval(() => {
    setSeconds(prevSeconds => prevSeconds + 1);
    ++count; 
    if (count % 59 === 0) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);                    
    }
  }, 1000); 
  setIntervalId(newIntervalId);
}; 
//-----------------------------------------------
  return (
    <main>
      <div>
        {won && startStop && <Confetti/>} 
        <Header /> 
        <Timer 
          seconds={seconds}
          minutes={minutes}
          intervalId={intervalId}
          startStop={startStop}        
        />
        <div className='container'> 
          {boxElements}
        </div>
        <div className='rollRecord'>
          <button 
            className='roll' 
            onClick={setGame} 
          > 
            <strong>{won ? "New Game" : "ROLL"}</strong>
          </button>
        </div>
      </div>       
      <div className='record'>
        <Raking
          record={record}  
          trys={trys} 
          bestTime={bestTime}
          seconds={seconds} 
          removeStorage={removeStorage}     
        />
      </div> 
    </main>
  )
} 