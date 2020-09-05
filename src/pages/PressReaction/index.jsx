import React, { 
  useEffect, 
  useCallback, 
  useState 
} from 'react';

import { 
  Container, 
  ClickContainer, 
  CircleToBeClickedASAP
} from './styles';

import randojs from '@nastyox/rando.js';
const rando = randojs.rando;

function PressReaction() {
  const [started, setStarted] = useState(false);
  const [counter, setCounter] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [clickable, setClickable] = useState(false);
  const [clickTimer, setClickTimer] = useState(null);

  useEffect(() => {
    document.title = "Press Reaction";

    return () => {
      document.title = "ReactionTimer";
    }
  }, []);  

  // const start = useCallback(() => {
  //   setStarted(true);
  //   console.log("started");
  //   if(counter > 0)
  //     setCountdown(setTimeout(() => setCounter(counter - 1), 1000));
    
  //   setClickTimer(setTimeout(() => setClickable(true), rando(3000, 13000)));
  // }, [counter]);

  const quit = useCallback(() => {
    console.log("quit");
    setStarted(false);
    clearTimeout(clickTimer);
    console.log("before setClickable false");
    setClickable(false);
    console.log("after setClickable false");
    clearTimeout(countdown);
    setCounter(3);
  }, [countdown, clickTimer]);

  useEffect(() => {
    if(started) {
      console.log("before setClickable true");
      setClickTimer(setTimeout(() => setClickable(true), rando(5000, 14000)));
      console.log("after setClickable true");
    }
  }, [started]);

  useEffect(() => {
    if(started && (counter > 0))
      setCountdown(setTimeout(() => setCounter(counter - 1), 1000));
  }, [started, counter]);

  useEffect(() => {
    console.log(clickable);
  }, [clickable]);

  const clickedCircle = useCallback(() => {
    console.log(`circle was clicked when clickable is ${clickable}`);
  }, [clickable]);

  return (
    <Container>
      <ClickContainer onClick={useCallback(() => setStarted(true), [])} >
      {/* <ClickContainer > */}
        {!started && <p>Click anywhere to start</p>}

        {started && counter !== 0 && <p>{counter}</p> }

        {counter === 0 && <CircleToBeClickedASAP 
          clickable={clickable} 
          onClick={clickedCircle} 
        />}

        {/* <CircleToBeClickedASAP clickable={clickable} /> */}
      </ClickContainer>
      
      {started && <button 
        id="quit"
        type="button" 
        onClick={quit} >
        <p>Quit</p>
      </button>}
    </Container>
  );
}

export default PressReaction;