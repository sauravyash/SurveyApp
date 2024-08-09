import React from 'react';
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2em 0;
  padding: 0 3em;
  flex-wrap: wrap;
  width: 100%;
  &:has(button:only-child) {
    justify-content: flex-end;
  }
`;

type ButtonVariant = 'fill' | 'outline';
type ButtonColour = 'accent' | 'neutral' | 'black' | 'white';

interface StyledButtonProps {
  variant: ButtonVariant;
  colour: ButtonColour;
}

const StyledButton = styled.button<StyledButtonProps>`
  font-family: 'Adobe Clean', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.3;
  border-radius: 16px;
  padding: 7px 14px;
  cursor: pointer;
  transition: all 130ms ease-in-out;
  outline: none;
  border: 2px solid transparent;

  ${({ variant, colour }) => {
    if (variant === 'fill') {
      return css`
        background-color: ${getBackgroundColor(colour)};
        color: ${getTextColor(colour)};

        &:hover:not(:disabled) {
          background-color: ${getHoverBackgroundColor(colour)};
        }

        &:active:not(:disabled) {
          background-color: ${getActiveBackgroundColor(colour)};
        }
      `;
    } else if (variant === 'outline') {
      return css`
        background-color: transparent;
        color: ${getBackgroundColor(colour)};
        border-color: ${getBackgroundColor(colour)};

        &:hover:not(:disabled) {
          background-color: ${getLightBackgroundColor(colour)};
        }

        &:active:not(:disabled) {
          background-color: ${getLighterBackgroundColor(colour)};
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #1473e6;
  }
`;

const getBackgroundColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return '#2680eb';
    case 'neutral': return '#e0e0e0';
    case 'black': return '#000000';
    case 'white': return '#ffffff';
  }
};

const getTextColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return '#ffffff';
    case 'neutral': return '#000000';
    case 'black': return '#ffffff';
    case 'white': return '#000000';
  }
};

const getHoverBackgroundColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return '#1473e6';
    case 'neutral': return '#d0d0d0';
    case 'black': return '#333333';
    case 'white': return '#f0f0f0';
  }
};

const getActiveBackgroundColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return '#0d66d0';
    case 'neutral': return '#c0c0c0';
    case 'black': return '#666666';
    case 'white': return '#e0e0e0';
  }
};

const getLightBackgroundColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return 'rgba(38, 128, 235, 0.1)';
    case 'neutral': return 'rgba(224, 224, 224, 0.1)';
    case 'black': return 'rgba(0, 0, 0, 0.1)';
    case 'white': return 'rgba(255, 255, 255, 0.1)';
  }
};

const getLighterBackgroundColor = (colour: ButtonColour): string => {
  switch (colour) {
    case 'accent': return 'rgba(38, 128, 235, 0.2)';
    case 'neutral': return 'rgba(224, 224, 224, 0.2)';
    case 'black': return 'rgba(0, 0, 0, 0.2)';
    case 'white': return 'rgba(255, 255, 255, 0.2)';
  }
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  colour?: ButtonColour;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'fill',
  colour = 'accent'
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      colour={colour}
    >
      {children || "Button"}
    </StyledButton>
  );
};

export { Button, ButtonWrapper };