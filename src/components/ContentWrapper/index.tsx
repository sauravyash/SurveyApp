import styled from 'styled-components';

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  min-width: 60%;
  max-width: 80%;
  margin: auto;
  max-height: 80vh;
  // overflow-y: auto;
`;

export const PrintScreenWrapper = styled.section`
  display: block;
  flex-direction: column;
  padding: 0;
  text-align: left;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 2rem;
`;

export default ContentWrapper;
