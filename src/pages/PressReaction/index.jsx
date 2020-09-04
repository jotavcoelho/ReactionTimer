import React, { 
  useEffect, 
  useCallback, 
  useState 
} from 'react';

import { Container, ClickContainer } from './styles';

function PressReaction() {
  const [started, setStarted] = useState(false);
  const [counter, setCounter] = useState(3);
  const [countdown, setCountdown] = useState(null);

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
    setStarted(false);
    setCounter(3);
    clearTimeout(countdown);
  }, [countdown]);

  useEffect(() => {
    if(started)
      if(counter > 0)
        setCountdown(setTimeout(() => 
          setCounter(counter - 1), 1000));

  }, [started, counter]);

  return (
    <Container>
      <ClickContainer onClick={start} >
        {!started && <p>Click anywhere to start</p>}

        {started && counter !== 0 && <p>{counter}</p> }

        {counter === 0 && <p>circle should be here</p>}
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