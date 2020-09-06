import React, { 
  useEffect, 
  useCallback, 
  useState 
} from 'react';

import { 
  Container, 
  GameContainer, 
  StartText,
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

  const [average, setAverage] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);

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
      const reactionTime = (timeWhenClicked - timeWhenClickable) / 1000;
      
      var newReactionTimes = reactionTimes;
      newReactionTimes.push(reactionTime.toFixed(3));
      
      setReactionTimes(newReactionTimes);
      // reactionTime.toFixed(4) makes the number have 4 floating points, this will be useful for the average
    }
    console.log(`circle was clicked when clickable is ${clickable}`);
  }, [clickable, timeWhenClickable, reactionTimes]);

  // useEffect(() => {
  //   setAverage(reactionTimes.reduce((total, next) => {
  //     return (total + next) / reactionTimes.length();
  //   }));
  // }, [reactionTimes]);

  return (
    <Container>
      <GameContainer>
      {/* <GameContainer onClick={useCallback(() => setStarted(true), [])} > */}
      {/* <GameContainer > */}
        {!started && <StartText onClick= {start}>Start</StartText>}

        {started && counter !== 0 && <p>{counter}</p> }

        {counter === 0 && <CircleToBeClickedASAP 
          clickable={clickable} 
          onClick={circleClicked} 
        />}

        {/* <CircleToBeClickedASAP clickable={clickable} /> */}
      {started && <button 
        id="quit"
        type="button" 
        onClick={quit} >
        <p>Quit</p>
      </button>}
      </GameContainer>
      
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
                {reactionTimes[0] && <>
                  <span>{reactionTimes[0]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>2</p>
              <IndividualSecs>
                {reactionTimes[1] && <>
                  <span>{reactionTimes[1]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>3</p>
              <IndividualSecs>
                {reactionTimes[2] && <>
                  <span>{reactionTimes[2]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>4</p>
              <IndividualSecs>
                {reactionTimes[3] && <>
                  <span>{reactionTimes[3]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>5</p>
              <IndividualSecs>
                {reactionTimes[4] && <>
                  <span>{reactionTimes[4]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
          </FirstHalf>
          <SecondHalf>
            <Time>
              <p>6</p>
              <IndividualSecs>
                {reactionTimes[5] && <>
                  <span>{reactionTimes[5]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>7</p>
              <IndividualSecs>
                {reactionTimes[6] && <>
                  <span>{reactionTimes[6]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>8</p>
              <IndividualSecs>
                {reactionTimes[7] && <>
                  <span>{reactionTimes[7]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>9</p>
              <IndividualSecs>
                {reactionTimes[8] && <>
                  <span>{reactionTimes[8]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
            <Time>
              <p>10</p>
              <IndividualSecs>
                {reactionTimes[9] && <>
                  <span>{reactionTimes[9]}</span>
                  <p>sec</p>
                </>}
              </IndividualSecs>
            </Time>
          </SecondHalf>
        </TimeList>
      </Sidebar>
    </Container>
  );
}

export default PressReaction;