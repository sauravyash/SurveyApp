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
    const borderWidth = '1px';
    if (variant === 'top-right') {
      return css`
        border-top-right-radius: 4px;
        border-bottom: 0;
        // border-right: 0;
        // border-top: 0;
      `;
    } else if (variant === 'bottom-right') {
      return css`
        border-top-width: ${borderWidth};
        border-bottom-right-radius: 4px;
        padding-top: 2px;
        // border-right: 0;
        // border-bottom: 0;
      `;
    }
  }}
  
  &:hover {
    background-color: ${colourStyles.default.hover};
  }

  ${({ disabled }) => disabled && css`
    background-color: ${colourStyles.disabled.background};
    cursor: not-allowed;
    background-color: var(--bulma-input-disabled-background-color);
    // border-right: ${colourStyles.disabled.border};
    box-shadow: none;
    color: var(--bulma-input-disabled-color);
  `}
`

const NumberInput = styled.input`
  &:disabled {
    border: ${colourStyles.disabled.border};
  }
`

const countDecimalPlaces = (num: number): number => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split(".")[1].length || 0;
}

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

  useEffect(() => {
    if (defaultValue === undefined || (defaultValue >= minValue || defaultValue <= maxValue)) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

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
    if (!isDisabled && value) {
      const newValue = Math.max(value - step, minValue);
      setValue(newValue);
      onChange?.(newValue);
    } else if (!isDisabled && value === undefined) {
      setValue(maxValue);
      onChange?.(maxValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      const keyPress = (e.nativeEvent as any);
      let newValue = Number(e.target.value.replace(/,/g, ''));
      
      if (keyPress.data === "-" && value) {
        setValue(-1 * value);
        onChange?.(-1 * value);
        return;
      }
      if (keyPress.inputType === "deleteContentBackward" && e.target.value === "-") {
        setValue(0);
        onChange?.(0);
        return;
      }
      if (Number.isNaN(newValue)) {
        console.log("Invalid number", newValue, e.target.value);
        return;
      }
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const onBlur = () => {
    if (value) {
      const newNum = Math.min(Math.max(value, minValue), maxValue);
      if (newNum !== value && !Number.isNaN(newNum)) {
        setValue(newNum);
        onChange?.(newNum);
      }
    }
  }

  return (
    <div className="field is-relative" style={{ margin }}>
      {label && <label style={{
        position: "absolute",
        top: "-1.5em",
        left: "-0.25em",
        padding: "0 0.5em",
        fontSize: "0.95em",
        color: colourStyles.default.color,
        zIndex: 100,
      }}>{label}</label>}
      <div className="control" id="number-input-control"
      style={{
        fontSize: state.fontSize,
      }}>
        <NumberInput
          className="input"
          type="text"
          value={formatValue(value)}
          onChange={handleInputChange}
          disabled={isDisabled}
          aria-label={ariaLabel}
          onBlur={onBlur}
          style={{
            borderBottomRightRadius: "4px",
            borderTopRightRadius: "4px",
            width: "128px",
            paddingRight: "36px",
            fontSize: "1em",
          }}
        />
        <div className="control" style={{ position: "absolute", right: 0, top: 0, zIndex: 100, overflow: "hidden", fontSize: state.fontSize }}>
          <div className="buttons has-addons is-flex-direction-column">
            <ChevronButton
              className='number-control-button number-control-button-top'
              onClick={increment}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Increment"
              variant='top-right'
              disabled={isDisabled || (value !== undefined && value >= maxValue)}
            >
              <span className="icon is-small">
                <ChevronUp />
              </span>
            </ChevronButton>
            <ChevronButton
              className='number-control-button number-control-button-bottom'
              onClick={decrement}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Decrement"
              variant='bottom-right'
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