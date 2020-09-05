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

  const start = useCallback(() => {
    setStarted(true);
  }, []);

  const quit = useCallback(() => {
    
  }, [countdown, clickTimer]);

  useEffect(() => {
    if(started) {
      console.log("entered started if");
      if(counter > 0) {
        setCountdown(setTimeout(() => 
          setCounter(counter - 1), 1000));
      }
      setClickTimer(setTimeout(
        () => setClickable(true), 
        rando(3000, 15000)));
    }

  }, [started, counter]);

  useEffect(() => {
    console.log(clickable);
  }, [clickable]);

  const clickedCircle = useCallback(() => {
    
  }, []);

  return (
    <Container>
      <ClickContainer onClick={useCallback(() => setStarted(true), [])} >
      {/* <ClickContainer > */}
        {!started && <p>Click anywhere to start</p>}

        {started && counter !== 0 && <p>{counter}</p> }

        {counter === 0 && <CircleToBeClickedASAP clickable={clickable} />}

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