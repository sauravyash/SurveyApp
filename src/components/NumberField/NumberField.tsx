import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import ChevronUp from '@spectrum-icons/workflow/ChevronUp';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import "./index.css";
import { useAnswerData } from '../../reducers/AnswerDataProvider';

const colourStyles = {
  default: {
    background: 'rgb(253, 253, 253)',
    color: '#777',
    border: '1px solid rgb(214, 217, 224)',
    hover: 'rgba(0, 0, 0, 0.1)',
  },
  disabled: {
    background: 'rgb(242, 242, 242)',
    border: '1px solid #efefef',
  },
  focus: {
    "border-color": "hsl(var(--bulma-input-focus-h),var(--bulma-input-focus-s),var(--bulma-input-focus-l))",
    "box-shadow": "var(--bulma-input-focus-shadow-size) hsla(var(--bulma-input-focus-h),var(--bulma-input-focus-s),var(--bulma-input-focus-l),var(--bulma-input-focus-shadow-alpha))"
  }
};

interface ChevronButtonProps {
  variant?: 'top-right' | 'bottom-right' | 'none';
  disabled?: boolean;
}

const ChevronButton = styled.div<ChevronButtonProps>`
  border: ${colourStyles.default.border};
  cursor: pointer;
  user-select: none;
  padding: 0 .5rem;
  margin: 0;
  border-radius: 0;
  height: 1.25em;
  background-color: ${colourStyles.default.background};
  
  ${({ variant }) => {
    if (variant === 'top-right') {
      return css`
        border-top-right-radius: 4px;
        border-bottom: 0;
      `;
    } else if (variant === 'bottom-right') {
      return css`
        border-bottom-right-radius: 4px;
        padding-top: 2px;
      `;
    }
  }}
  
  &:hover {
    background-color: ${colourStyles.default.hover};
  }

  ${({ disabled }) => disabled && css`
    background-color: ${colourStyles.disabled.background};
    cursor: not-allowed;
    box-shadow: none;
    color: var(--bulma-input-disabled-color);
  `}
`;

const NumberInput = styled.input`
  &:disabled {
    border: ${colourStyles.disabled.border};
  }
`;

const countDecimalPlaces = (num: number): number => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split(".")[1].length || 0;
};

interface NumberPickerProps {
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange?: (value: number) => void;
  isDisabled?: boolean;
  'aria-label'?: string;
  formatOptions?: {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  };
  label?: string | null;
  margin?: string;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  defaultValue,
  minValue = Number.MIN_SAFE_INTEGER,
  maxValue = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  isDisabled = false,
  'aria-label': ariaLabel,
  formatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: countDecimalPlaces(step),
  },
  label = null,
  margin = "0",
}) => {
  const { state } = useAnswerData();
  const [value, setValue] = useState<number | undefined>(defaultValue);
  const [isDecimalPressed, setIsDecimalPressed] = useState(false);
  

  // Set initial value if provided
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    } else {
      setValue(undefined);
    }
  }, [defaultValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment(e);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement(e);
    }
  };

  const formatValue = (val: number | undefined) => {
    if (val === undefined) return "";
    return val.toLocaleString(undefined, formatOptions);
  };

  const increment = (e: any) => {
    e.nativeEvent.preventDefault();
    if (!isDisabled && value !== undefined) {
      const newValue = Math.min(value + step, maxValue);
      setValue(newValue);
      onChange?.(newValue);
    } else if (!isDisabled && value === undefined) {
      setValue(minValue);
      onChange?.(minValue);
    }
  };

  const decrement = (e: any) => {
    e.nativeEvent.preventDefault();
    if (!isDisabled && value !== undefined) {
      const newValue = Math.max(value - step, minValue);
      setValue(newValue);
      onChange?.(newValue);
    } else if (!isDisabled && value === undefined) {
      setValue(maxValue);
      onChange?.(maxValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const { value: inputValue } = e.target;
    // Remove commas for parsing
    const normalized = inputValue.replace(/,/g, '');
    // Allow input to be just a minus sign
    if (normalized === "-") {
      setValue(0);
      return;
    }
    // Detect if the user pressed a decimal point.
    // (This simple approach may need to be enhanced for more complex cases.)
    if (normalized.endsWith(".")) {
      setIsDecimalPressed(true);
    } else {
      setIsDecimalPressed(false);
    }
    const newValue = Number(normalized);
    if (Number.isNaN(newValue)) {
      console.log("Invalid number", newValue, inputValue);
      return;
    }
    setValue(newValue);
    onChange?.(newValue);
  };

  const onBlur = () => {
    if (value !== undefined) {
      const newNum = Math.min(Math.max(value, minValue), maxValue);
      if (newNum !== value && !Number.isNaN(newNum)) {
        setValue(newNum);
        onChange?.(newNum);
      }
    }
  };

  return (
    <div className="field is-relative" style={{ margin }}>
      {label && (
        <label
          style={{
            position: "absolute",
            top: "-1.5em",
            left: "-0.25em",
            padding: "0 0.5em",
            fontSize: "0.95em",
            color: colourStyles.default.color,
            zIndex: 35,
          }}
        >
          {label}
        </label>
      )}
      <div
        className="control"
        id="number-input-control"
        style={{
          fontSize: state.fontSize,
        }}
      >
        <NumberInput
          className="input"
          type="text"
          value={formatValue(value) + (isDecimalPressed ? "." : "")}
          onChange={handleInputChange}
          disabled={isDisabled}
          aria-label={ariaLabel}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          style={{
            borderBottomRightRadius: "4px",
            borderTopRightRadius: "4px",
            width: "128px",
            paddingRight: "36px",
            fontSize: "1em",
          }}
        />
        <div
          className="control"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 35,
            overflow: "hidden",
            fontSize: state.fontSize,
          }}
        >
          <div className="buttons has-addons is-flex-direction-column">
            <ChevronButton
              className="number-control-button number-control-button-top"
              onClick={increment}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Increment"
              variant="top-right"
              disabled={isDisabled || (value !== undefined && value >= maxValue)}
            >
              <span className="icon is-small">
                <ChevronUp />
              </span>
            </ChevronButton>
            <ChevronButton
              className="number-control-button number-control-button-bottom"
              onClick={decrement}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Decrement"
              variant="bottom-right"
              disabled={isDisabled || (value !== undefined && value <= minValue)}
            >
              <span className="icon is-small">
                <ChevronDown />
              </span>
            </ChevronButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberPicker;
