
import { useNavigate } from 'react-router-dom';

import React from 'react';
import styled from 'styled-components';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import terms_of_use from '../../resources/terms_of_use.md';
import { Button, ButtonWrapper } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import { TermsAndCondtitions, TermsAndCondtitionsWrapper } from '../../components/TermsAndCondtitionsWrapper';
import { Subtitle, Title } from '../../components/Headings';
import RestoreProgressModal from '../../components/RestoreProgressModal';
import { useAnswerData } from '../../reducers/AnswerDataProvider';

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: sepia(0.6) blur(2px) brightness(0.8);
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {state} = useAnswerData();
  return (
    <PageWrapper color='#002335'>
      <BackgroundImage src="images/stock/iStock-162666975.jpg" />
      <ContentWrapper id="home-page" style={{
        fontSize: state.fontSize,
      }}>
        <Title>Welcome to our site</Title>
        <Subtitle>Terms of Use</Subtitle>
        <TermsAndCondtitionsWrapper>
          <TermsAndCondtitions className='content' style={{'--bulma-strong-color': "#000"} as React.CSSProperties}>
            <Markdown remarkPlugins={[remarkGfm]}>{terms_of_use}</Markdown>
          </TermsAndCondtitions>
        </TermsAndCondtitionsWrapper>
        <ButtonWrapper>
          <Button
            colour='accent'
            variant='fill'
            onClick={() => navigate('/privacy')}
          >Continue</Button>
        </ButtonWrapper>
      </ContentWrapper>
      <RestoreProgressModal />
    </PageWrapper>
  );
};

export default HomePage;