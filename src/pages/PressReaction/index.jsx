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

  const quit = useCallback((e) => {
    if(e)
      setReactionTimes([]);
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

  const reset = useCallback(async () => {
    await quit(); // if I hadn't used await, the clickable timer wouldn't be resetting, damn, having the knowledge that state changes are kinda async really helped
    start();
  }, [quit, start]);

  const circleClicked = useCallback(async () => {
    if(!clickable) {
      var newReactionTimes = reactionTimes;
      const penalty = 1;
      newReactionTimes.push(penalty.toFixed(3));
      setReactionTimes(newReactionTimes);

      reset();
      
    } else {
      const timeWhenClicked = Date.now();
      const reactionTime = (timeWhenClicked - timeWhenClickable) / 1000;
      
      newReactionTimes = reactionTimes;
      newReactionTimes.push(reactionTime.toFixed(3));
      setReactionTimes(newReactionTimes);
      // reactionTime.toFixed(4) makes the number have 4 floating points, this will be useful for the average
      reset();

    }
    console.log(`circle was clicked when clickable is ${clickable}`);
  }, [clickable, timeWhenClickable, reactionTimes, reset]);

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
                  <span>{reactionTimes[0] ? reactionTimes[0] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>2</p>
              <IndividualSecs>
                  <span>{reactionTimes[1] ? reactionTimes[1] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>3</p>
              <IndividualSecs>
                  <span>{reactionTimes[2] ? reactionTimes[2] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>4</p>
              <IndividualSecs>
                  <span>{reactionTimes[3] ? reactionTimes[3] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>5</p>
              <IndividualSecs>
                  <span>{reactionTimes[4] ? reactionTimes[4] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
          </FirstHalf>
          <SecondHalf>
            <Time>
              <p>6</p>
              <IndividualSecs>
                  <span>{reactionTimes[5] ? reactionTimes[5] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>7</p>
              <IndividualSecs>
                  <span>{reactionTimes[6] ? reactionTimes[6] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>8</p>
              <IndividualSecs>
                  <span>{reactionTimes[7] ? reactionTimes[7] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>9</p>
              <IndividualSecs>
                  <span>{reactionTimes[8] ? reactionTimes[8] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
            <Time>
              <p>10</p>
              <IndividualSecs>
                  <span>{reactionTimes[9] ? reactionTimes[9] : "0.000"}</span>
                  <p>sec</p>
              </IndividualSecs>
            </Time>
          </SecondHalf>
        </TimeList>
      </Sidebar>
    </Container>
  );
}

export default PressReaction;