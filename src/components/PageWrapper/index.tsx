import styled from 'styled-components';

const PageWrapper = styled.section<{ color?: string; }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.color || '#fff'};
`;

export default PageWrapper;
