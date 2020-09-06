import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
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
      font-size: 20px;
      text-transform: uppercase;
    }
  }
`;

export const CircleToBeClickedASAP = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${props => props.clickable ? '#F0DD60' : '#9A031E'};
`;

export const Sidebar = styled.div`
  background: none;
  width: 240px;
  height: 160px;
  margin-left: 30px;
  
`;

export const PseudoHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: 30px;
  border-bottom: solid 4px #F0DD60;
  font-weight: bold;
`;

export const Secs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  > span {
    font-size: 24px;
  }
`;

export const TimeList = styled.div`
  display: flex;
  height: 90%;
  flex-flow: column wrap;
  padding: 8px 0;
`;

export const FirstHalf = styled.div`
  margin-right: 8px;


`;

export const SecondHalf = styled.div`
  margin-left: 8px;
  padding-right: 5px;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: 24px;
  border-bottom: 1px dotted #decaf7;
  margin-bottom: 2px;

  > p {
    font-size: 12px;
  }
  
  p {
    color: #decaf7;
  }

  span {
    font-weight: bold;
    font-size: 16px;
    margin-right: 2px;
  }

  &:last-child {
    border:none;
  }
`;

export const IndividualSecs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
