import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  min-height: 500px;
  margin: 30px auto;
  display: flex;
  position: relative;

  #quit {
    position: absolute;
    top: 20px;
    right: 20px;

    p {
      font-weight: normal;
      text-transform: uppercase;
    }
  }
`;

export const ClickContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #040108;
  border-radius: 20px;

  > p {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

export const CircleToBeClickedASAP = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #9A031E;
`;
