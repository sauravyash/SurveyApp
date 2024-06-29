import { Button as AriaButton } from 'react-aria-components';
import styled from "styled-components";

const Button = styled(AriaButton)`
  --text-color: #000;
  --text-color-disabled: #000;
  --button-background: #fff;
  --button-background-pressed: #f0f0f0;
  --border-color: #000;
  --border-color-pressed: #ccc;
  --border-color-disabled: #ccc;

  color: var(--text-color);
  background: var(--button-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  appearance: none;
  vertical-align: middle;
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem;
  outline: none;
  padding: 6px 10px;
  text-decoration: none;

  &[data-pressed] {
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.1);
    background: var(--button-background-pressed);
    border-color: var(--border-color-pressed);
  }

  &[data-focus-visible] {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: -1px;
  }

  &[data-disabled]{
    border-color: var(--border-color-disabled);
    color: var(--text-color-disabled);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2em 0;
  min-width: 50%;
  flex-wrap: wrap;
  max-width: 80%;
`;

export { Button, ButtonWrapper };