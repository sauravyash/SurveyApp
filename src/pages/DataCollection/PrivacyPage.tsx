import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import CheckMark from '@spectrum-icons/workflow/CheckmarkCircle';
import { useAnswerData } from '../../reducers/AnswerDataProvider.tsx';

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  // position: relative;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  padding: 0;
  text-align: center;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  width: 100%;
  margin: auto;
  height: 100vh;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  filter: sepia(0.6) blur(2px);
`;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  height: 100%;
  width: 50%;
  position: relative;
  background: transparent;
`;

const BoxButton = styled.button`
  width: 50%;
  min-width: 450px;
  height: 450px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #000;
  padding: 1em 2em;
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 3;
  &:hover {
  }
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  margin: 1.5rem;
  color: #000;
`;

const Subtitle = styled.h2`
  font-size: 1.25em;
  text-align: center;
  font-weight: 600;
  margin: 1rem;
  color: #777;
  text-transform: uppercase;
`;

const ButtonLikeBox = styled.span.attrs(({ className }) => ({ className: `button is-outlined ${className}` }))`
  font-size: 2em;
  font-weight: 700;
  border-width: 4px;
  &:hover {
    --bulma-button-border-width: 1px !important;
  }
`

const ContinueButton = styled.button.attrs(({ className }) => ({ className: `button is-large ${className}` }))`
  margin-top: 1.5rem;
`

const PrivacyPage: React.FC = () => {
  let navigate = useNavigate();
  let [collectData, setCollectData] = React.useState<boolean>(false);

  const { state, dispatch } = useAnswerData();

  useEffect(() => {
    if (state && state.collectData) {
      setCollectData(state.collectData);
    }
  }, [state]);


  const handleDataCollection = (collectData: boolean) => {
    setCollectData(collectData);
    dispatch({ type: 'set_collect_data', payload: collectData });
    if (collectData) {
      navigate('/patient-information')
    } else {
      navigate('/survey')
    }
  }

  return (
    <PageWrapper>
      <Wrapper id="privacy-page">
        <ButtonSection>
          <BackgroundImage src="images/stock/iStock-855246888.jpg" />
          <BoxButton onClick={() => handleDataCollection(true)}>
            <Subtitle>I wish to</Subtitle>
            <Title>TAKE THE ASSESSMENT AND</Title>
            <ButtonLikeBox className="is-success">Participate</ButtonLikeBox>
            <Title>IN RESEARCH</Title>
            <ContinueButton className='is-success'>
              <span>Continue</span>
              <span className={'icon ' + (collectData || 'is-hidden')}>
                <CheckMark aria-label='Not participated is Selected' />
              </span>
            </ContinueButton>
          </BoxButton>
        </ButtonSection>
        <ButtonSection>
          <BackgroundImage src="images/stock/iStock-162666975.jpg" />
          <BoxButton onClick={() => handleDataCollection(false)}>
            <Subtitle>I wish to</Subtitle>
            <Title>TAKE THE ASSESSMENT AND</Title>
            <ButtonLikeBox className="is-dark">Not Participate</ButtonLikeBox>
            <Title>IN RESEARCH</Title>
            <ContinueButton className='is-dark'>
              <span>Continue</span>
              <span className={'icon ' + (collectData && 'is-hidden')}>
                <CheckMark aria-label='Not participated is Selected' />
              </span>
            </ContinueButton>
          </BoxButton>
        </ButtonSection>
      </Wrapper>
    </PageWrapper>
  );
};

export default PrivacyPage;