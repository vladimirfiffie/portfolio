import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <button className="bubbles">
        <span className="text">{children}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .bubbles {
    --c1: #212121;
    --c2: #10b981;
    --size-letter: 32px;
    padding: 0.5em 1em;
    font-size: var(--size-letter);

    background-color: transparent;
    border: calc(var(--size-letter) / 6) solid var(--c2);
    border-radius: 0.2em;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: 300ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .bubbles > .text {
    font-weight: 700;
    color: var(--c2);
    position: relative;
    z-index: 1;
    transition: color 700ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .bubbles::before,
  .bubbles::after {
    content: "";
    width: 150%;
    aspect-ratio: 1/1;
    scale: 0;
    transition: 1000ms cubic-bezier(0.76, 0, 0.24, 1);
    background-color: var(--c2);
    border-radius: 50%;
    position: absolute;
    translate: -50% -50%;
  }

  .bubbles:hover {
    & > span {
      color: var(--c1);
    }
    &::before,
    &::after {
      scale: 1;
    }
  }

  .bubbles:active {
    scale: 0.98;
    filter: brightness(0.9);
  }
`;

export default Button;
