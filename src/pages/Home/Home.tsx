
import { useNavigate } from 'react-router-dom';

import React from 'react';
import styled from 'styled-components';

import termsAndConditions from '../../resources/termsAndConditions.ts';
import { Divider } from '@adobe/react-spectrum';
import { Button, ButtonWrapper } from '../../components/Button';

const Wrapper = styled.section`
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
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  margin: 4rem 0 1rem;
  color: #000;
`;
const Subtitle = styled.h1`
  font-size: 2em;
  text-align: center;
  padding: 0 4rem;
  margin: 1rem 0;
  color: #000;
`;

const TermsAndCondtitions = styled.p`
  font-size: 1em;
  text-align: left;
  color: #000;
  overflow: auto;
  text-wrap: wrap;
  margin: 0 3rem;
  padding: 1rem;
  border-radius: 1em;
  max-height: 70%;
  display: inline-block;
  background: #fff;
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const tandc = termsAndConditions.split('\n').map((line, index) => {
    if (line === '' && index === 0) return null;
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });
  return (
    <section>
      <BackgroundImage src="images/stock/iStock-162666975.jpg" />
      <Wrapper id="home-page">
        <Title>Welcome to our site</Title>
        <Subtitle>Terms of Use</Subtitle>
        <Divider />
        <TermsAndCondtitions>{tandc}</TermsAndCondtitions>
        <ButtonWrapper>
          <Button
            onPress={() => navigate('/privacy')}
          >Continue</Button>
        </ButtonWrapper>
      </Wrapper>
    </section>
  );
};

export default HomePage;