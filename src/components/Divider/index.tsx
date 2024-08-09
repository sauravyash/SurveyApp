import React from 'react';

interface DividerProps {
  vertical?: boolean;
  borderColor?: string;
  borderWidth?: string;
  margin?: string;
  borderLength?: string;
}

const Divider: React.FC<DividerProps> = ({ vertical, borderColor, borderWidth, margin, borderLength}) => {
  const horizontal = !vertical;
  const borderStyle = `${borderWidth} solid ${borderColor}` || '1px solid black';
  borderLength = borderLength || '95%';
  borderColor = borderColor || 'black';
  const styles: React.CSSProperties = {
    border: 'none',
    borderTop: horizontal ? borderStyle : 'none',
    borderLeft: vertical ? borderStyle : 'none',
    width: vertical ? borderWidth : borderLength,
    height: horizontal ? borderWidth : borderLength,
    margin: margin || '1rem',
  };
  

  return <hr style={styles} />;
};

export default Divider;