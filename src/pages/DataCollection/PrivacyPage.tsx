
import { useNavigate } from 'react-router-dom';

import React from 'react';
import styled from 'styled-components';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { ButtonWrapper } from '../../components/Button/index.tsx';
import { useAnswerData } from '../../reducers/AnswerDataProvider.tsx';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  text-align: center;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  min-width: 60%;
  max-width: 80%;
  margin: auto;
  max-height: 80vh;
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  margin: 4rem 0 1rem;
  color: #000;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: sepia(0.6) blur(2px);
`;

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  const { dispatch } = useAnswerData();

  const handleDataCollection = (collectData: boolean) => {
    dispatch({ type: 'set_collect_data', payload: collectData });
    navigate('/survey')
  }

  return (
    <Provider theme={defaultTheme}>
      <BackgroundImage src="images/stock/iStock-162666975.jpg" />
      <Wrapper id="privacy-page">
        <Title>We request to collect data</Title>
        <ButtonWrapper className='buttons'>
          <button 
            className='button is-info'
            onClick={() => handleDataCollection(true)}
          >Yes, I permit Data Collection</button>
          <button
            className='button is-dark'
            onClick={() => handleDataCollection(false)}
          >No, do not collect data.</button>
        </ButtonWrapper>
      </Wrapper>
    </Provider>
  );
};

export default PrivacyPage;