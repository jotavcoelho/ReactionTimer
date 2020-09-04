import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

function Main() {
  return (
    <Container>
      <Link to="/pressReaction">
        <button type="button">
          <p>
            Press Reaction
          </p>
        </button>
      </Link>
    </Container>
  );
}

export default Main;