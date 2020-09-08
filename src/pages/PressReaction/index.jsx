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

  const dynamicUpdateAverage = useCallback(() => {
    if(reactionTimes.length) {
      const reactionSum = reactionTimes.reduce((total, next) => {
        return Number(total) + Number(next);
      }, 0);
      console.log(reactionSum);
      const reactionAverage = reactionSum / reactionTimes.length;
      setAverage(reactionAverage.toFixed(4));
    }
  }, [reactionTimes]);

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
    // setCounter(3);
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

  const punish = useCallback(() => {
    const newReactionTimes = reactionTimes;
    const penalty = 1;
    
    newReactionTimes.push(penalty.toFixed(3));
    setReactionTimes(newReactionTimes);

    reset();
  }, [reactionTimes, reset]);


  // const dynamicUpdateAverage = useCallback(() => {
  //   setAverage(reactionTimes.reduce((total, next) => {
  //     console.log(total);
  //     console.log(next);
  //     console.log(reactionTimes);
  //     console.log(reactionTimes.length);
  //     return (Number(total) + Number(next)) / reactionTimes.length;
  //   }));
  // }, [reactionTimes]);

  const staticUpdateAverage = useCallback(() => {
    const reactionSum = reactionTimes.reduce((total, next) => {
      return Number(total) + Number(next);
    }, 0);

    const reactionAverage = reactionSum / 10;
    setAverage(reactionAverage.toFixed(4));
  }, [reactionTimes]);

  const circleClicked = useCallback(async () => {
    if(!clickable) {
      await punish();
      // if(reactionTimes.length === 10)
        // staticUpdateAverage();
        dynamicUpdateAverage();
    } else {
      const timeWhenClicked = Date.now();
      const reactionTime = (timeWhenClicked - timeWhenClickable) / 1000;
      
      const newReactionTimes = reactionTimes;
      newReactionTimes.push(reactionTime.toFixed(3));
      await setReactionTimes(newReactionTimes);
      // if(reactionTimes.length === 10)
        // staticUpdateAverage();
        dynamicUpdateAverage();
      // reactionTime.toFixed(4) makes the number have 4 floating points, this will be useful for the average
      // dynamicUpdateAverage();
      reset();
    }
    console.log(`circle was clicked when clickable is ${clickable}`);
  }, [clickable, timeWhenClickable, reactionTimes, punish, reset, dynamicUpdateAverage]);

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
            {average && <>
                <span>{average}</span>
                <p>sec</p>
              </>
            }
          </Secs>
        </PseudoHeader>
        <TimeList>
          <FirstHalf>
            <Time>
              <p>1</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[0] ? reactionTimes[0] : "0.000"}</span> */}
                  {reactionTimes[0] && 
                    <>
                      <span>{reactionTimes[0]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>2</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[1] ? reactionTimes[1] : "0.000"}</span> */}
                  {reactionTimes[1] && 
                    <>
                      <span>{reactionTimes[1]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>3</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[2] ? reactionTimes[2] : "0.000"}</span> */}
                  {reactionTimes[2] && 
                    <>
                      <span>{reactionTimes[2]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>4</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[3] ? reactionTimes[3] : "0.000"}</span> */}
                  {reactionTimes[3] && 
                    <>
                      <span>{reactionTimes[3]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>5</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[4] ? reactionTimes[4] : "0.000"}</span> */}
                  {reactionTimes[4] && 
                    <>
                      <span>{reactionTimes[4]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
          </FirstHalf>
          <SecondHalf>
            <Time>
              <p>6</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[5] ? reactionTimes[5] : "0.000"}</span> */}
                  {reactionTimes[5] && 
                    <>
                      <span>{reactionTimes[5]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>7</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[6] ? reactionTimes[6] : "0.000"}</span> */}
                  {reactionTimes[6] && 
                    <>
                      <span>{reactionTimes[6]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>8</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[7] ? reactionTimes[7] : "0.000"}</span> */}
                  {reactionTimes[7] && 
                    <>
                      <span>{reactionTimes[7]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>9</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[8] ? reactionTimes[8] : "0.000"}</span> */}
                  {reactionTimes[8] && 
                    <>
                      <span>{reactionTimes[8]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
            <Time>
              <p>10</p>
              <IndividualSecs>
                  {/* <span>{reactionTimes[9] ? reactionTimes[9] : "0.000"}</span> */}
                  {reactionTimes[9] && 
                    <>
                      <span>{reactionTimes[9]}</span>
                      <p>sec</p>
                    </>
                  }
              </IndividualSecs>
            </Time>
          </SecondHalf>
        </TimeList>
      </Sidebar>
    </Container>
  );
}

export default PressReaction;