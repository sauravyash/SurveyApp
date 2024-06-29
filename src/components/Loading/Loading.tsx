import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-aria-components';
import styled from 'styled-components';

const SVGCircle = styled.circle`
  fill: none;
  --border-color: #000;
  --highlight-background: #000;
`;

const Loading = ({
  primaryColor = "#000", 
  secondaryColor = "#fff",
  center = 16,
  strokeWidth = 5,
}) => {
  const [loadingValue, setLoadingValue] = useState(0);
  const [clearLoadingValue, setClearLoadingValue] = useState(0);

  const r = center - strokeWidth;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingValue((prevLoadingValue) => {
        if (prevLoadingValue >= 100) {
          setClearLoadingValue((prevClearValue) => {
            if (prevClearValue >= 200) {
              setLoadingValue(0);
              return 0;
            }
            return prevClearValue + 1;
          });
          return prevLoadingValue;
        }
        setClearLoadingValue(0)
        return prevLoadingValue + 1;
      });

    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressBar aria-label="Loading…" value={loadingValue - (clearLoadingValue / 2)}>
      <svg
        width={64}
        height={64}
        viewBox="0 0 32 32"
        fill={secondaryColor}
        strokeWidth={strokeWidth}
      >
        <SVGCircle
          cx={center}
          cy={center}
          r={r + strokeWidth / 2 - 0.25}
          stroke={primaryColor}
          strokeWidth={0.75}
        />
        <SVGCircle
          cx={center}
          cy={center}
          r={r}
          stroke={primaryColor}
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={(1 - loadingValue / 100) * c}
          strokeLinecap="butt"
          transform="rotate(-90 16 16)"
          z={clearLoadingValue > 1 ? 100 : 0}
        />
        <SVGCircle
          cx={center}
          cy={center}
          r={r - 0.75}
          stroke={secondaryColor}
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={(1 - clearLoadingValue / 200) * c}
          strokeLinecap="butt"
          transform="rotate(-90 16 16)"
          z={clearLoadingValue < 1 ? 100 : 0}
        />
        <SVGCircle
          cx={center}
          cy={center}
          r={r - strokeWidth / 2 + 0.25}
          stroke={primaryColor}
          strokeWidth={0.75}
        />
      </svg>
    </ProgressBar>
  );
}

export default Loading;
