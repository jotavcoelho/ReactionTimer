import React, { 
  useEffect, 
  useCallback, 
  useState 
} from 'react';

import { 
  Container, 
  ClickContainer, 
  CircleToBeClickedASAP,
  Sidebar,
  PseudoHeader,
  Secs,
  TimeList,
  FirstHalf,
  SecondHalf,
  Time,
  IndividualSecs
} from './styles';

import randojs from '@nastyox/rando.js';
const rando = randojs.rando;

function PressReaction() {
  const [started, setStarted] = useState(false);

  const [counter, setCounter] = useState(3);
  const [countdown, setCountdown] = useState(null);

  const [clickable, setClickable] = useState(false);
  const [clickTimer, setClickTimer] = useState(null);

  const [timeWhenClickable, setTimeWhenClickable] = useState(null);

  useEffect(() => {
    document.title = "Press Reaction";

    return () => {
      document.title = "ReactionTimer";
    }
  }, []);  

  const quit = useCallback(() => {
    console.log("quit");
    setStarted(false);

    clearTimeout(clickTimer);
    setClickable(false);

    clearTimeout(countdown);
    setCounter(3);
  }, [countdown, clickTimer]);

  useEffect(() => {
    if(started) {
      setClickTimer(setTimeout(() => setClickable(true), rando(5000, 14000)));
    }
  }, [started]);

  useEffect(() => {
    if(started && (counter > 0))
      setCountdown(setTimeout(() => setCounter(counter - 1), 1000));
  }, [started, counter]);

  useEffect(() => {
    if(started && clickable)
      setTimeWhenClickable(Date.now());
  }, [started, clickable]);

  const circleClicked = useCallback(() => {
    if(!clickable) {
      console.log("It wasn't clickable, one second penalty");
    } else {
      const timeWhenClicked = Date.now();
      const reactionTime = timeWhenClicked - timeWhenClickable;
      console.log(reactionTime);
    }
    console.log(`circle was clicked when clickable is ${clickable}`);
  }, [clickable, timeWhenClickable]);

  return (
    <>
      <Container>
        <ClickContainer onClick={useCallback(() => setStarted(true), [])} >
        {/* <ClickContainer > */}
          {!started && <p>Click anywhere to start</p>}

          {started && counter !== 0 && <p>{counter}</p> }

          {counter === 0 && <CircleToBeClickedASAP 
            clickable={clickable} 
            onClick={circleClicked} 
          />}

          {/* <CircleToBeClickedASAP clickable={clickable} /> */}
        </ClickContainer>
        
        {started && <button 
          id="quit"
          type="button" 
          onClick={quit} >
          <p>Quit</p>
        </button>}
        <Sidebar>
          <PseudoHeader>
            <p>Average:</p>
            <Secs>
              <span>0.0000</span>
              <p>sec</p>
            </Secs>
          </PseudoHeader>
          <TimeList>
            <FirstHalf>
              <Time>
                <p>1</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>2</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>3</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>4</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>5</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
            </FirstHalf>
            <SecondHalf>
              <Time>
                <p>6</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>7</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>8</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>9</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
              <Time>
                <p>10</p>
                <IndividualSecs>
                  <span>0.288</span>
                  <p>sec</p>
                </IndividualSecs>
              </Time>
            </SecondHalf>
          </TimeList>
        </Sidebar>
      </Container>
    </>
  );
}

export default PressReaction;