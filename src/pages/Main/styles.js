import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  min-height: 600px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  a {
    margin: 10px;

    button {
      background: #006e90;
      height: 10vh;
      width: 15vw;
      border: 2px solid #e8fcc2;
      border-radius: 8px;

      p {
        font-weight: bold;
      }
    }
  }
`;
