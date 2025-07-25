import PageWrapper from '../../components/PageWrapper';
import ContentWrapper, { PrintScreenWrapper } from '../../components/ContentWrapper';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { TermsAndCondtitions, TermsAndCondtitionsWrapper } from '../../components/TermsAndCondtitionsWrapper';

import terms_of_use from '../../resources/patient_statement.md';
import { Button, ButtonWrapper } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Headings';
import Divider from '../../components/Divider';
import Checkbox from '@spectrum-icons/workflow/Checkmark';
import TextDocument from '@spectrum-icons/workflow/Document';
import InfoOutline from '@spectrum-icons/workflow/InfoOutline';
import QuestionMark from '@spectrum-icons/workflow/Question';
import UserExclude from '@spectrum-icons/workflow/UserExclude';
import Email from '@spectrum-icons/workflow/Email';
import { Switch } from '@adobe/react-spectrum';
import { useEffect, useState } from 'react';
import { useAnswerData } from '../../reducers/AnswerDataProvider';

import "./style.scss";

const agree_statements: {
  icon: React.FC<any>,
  text: string,
  color: 'positive' | 'informative' | 'notice' | 'negative' | undefined
}[] = [
    {
      icon: Checkbox,
      text: 'I understand I am being asked to provide consent to participate in this research study;',
      color: 'positive' // green
    },
    {
      icon: TextDocument,
      text: 'I have read the Participant Information Sheet, or it has been provided to me in a language that I understand;',
      color: 'informative' // blue
    },
    {
      icon: InfoOutline,
      text: 'I provide my consent for the information collected about me to be used as described in section 6 of this document.',
      color: 'positive' // indigo
    },
    {
      icon: QuestionMark,
      text: 'I understand that if necessary, I can ask questions and the research team will respond to my questions.',
      color: 'notice' // yellow
    },
    {
      icon: UserExclude,
      text: 'I freely agree to participate in this research study as described and understand that I am free to withdraw at any time during the study and withdrawal will not affect my relationship with any of the named organisations and/or research team members;',
      color: 'negative' // red
    },
    {
      icon: Email,
      text: 'A copy of the participant information statement and consent form can be provided to me via email',
      color: 'informative'
    }
  ];

interface Props {}

const PatientParticipationStatement: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAnswerData();
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    name: "",
    address: "",
    email: "",
    reuseData: true,
    detailsCorrect: false,
    emailConsentForm: false
  });
  const [isDataValid, setIsDataValid] = useState(false);

  const [printFormActive, setPrintFormActive] = useState(false);

  useEffect(() => {
    dispatch({ type: 'set_user_data', payload: data });
  }, [data]);

  const lastPage = 2;
  const handleNextPage = () => {
    if (page === lastPage) {
      navigate('/survey');
      return;
    }
    setPage(page + 1);
  }
  const handlePrevPage = () => {
    if (page === 0) {
      return;
    }
    setPage(page - 1);
  }

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateName = (name: any) => {
    return String(name).match(/^[a-zA-Z\s]*$/);
  }

  const handleDoNotAgree = () => {
    dispatch({ type: 'set_collect_data', payload: false });
    navigate('/survey')
  }

  useEffect(() => {
    if (data.name && data.email && data.detailsCorrect) {
      if (validateEmail(data.email) && validateName(data.name)) {
        setIsDataValid(true);
        return;
      }
    }
    setIsDataValid(false);
  }, [data]);

  useEffect(() => {
    if (printFormActive) {
      window.print();
      setPrintFormActive(false);
    }
  }, [printFormActive])

  const ConsentForm = () => (
    <div className='content' id='printer-friendly'>
      <Markdown remarkPlugins={[remarkGfm]}>{terms_of_use}</Markdown>
      <h2>Declaration by the participant</h2>
      <p>By checking the I agree/start questionnaire option below:</p>
      <ul style={{ listStyle: "none", margin: 0 }}>
        {agree_statements.map((statement, index) => (
          <li key={index} className="mb-3">
            <div className='columns is-vcentered'>
              <div className="mt-2"><statement.icon size="S" margin={"0 1.5rem"} color={statement.color} /></div>
              <div className="column"><span>{statement.text}</span></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  if (printFormActive) {
    return (
      <PrintScreenWrapper>
        <ConsentForm />
      </PrintScreenWrapper>
    )
  }

  return (
    <PageWrapper color='#491a35' style={{
      fontSize: state.fontSize,
    }}>
      {page === 0 && !printFormActive && (
        <ContentWrapper>
          <Title>Online participant information statement</Title>
          <Divider borderColor='#999' />
          <TermsAndCondtitionsWrapper>
            <TermsAndCondtitions className='content' style={{ '--bulma-strong-color': "#000" } as React.CSSProperties}>
              <Markdown remarkPlugins={[remarkGfm]}>{terms_of_use}</Markdown>
            </TermsAndCondtitions>
          </TermsAndCondtitionsWrapper>
          <ButtonWrapper>
            <Button
              colour='accent'
              variant='fill'
              onClick={() => setPrintFormActive(true)}
            >Print Consent Form</Button>
            <Button
              colour='accent'
              variant='fill'
              onClick={handleNextPage}
            >Continue</Button>
          </ButtonWrapper>
        </ContentWrapper>
      )}
      {page === 1 && (
        <ContentWrapper>
          <Title>Consent Form – Participant providing own consent</Title>
          <Divider borderColor='#999' />
          <TermsAndCondtitionsWrapper>
            <TermsAndCondtitions className='content' style={{ '--bulma-strong-color': "#000" } as React.CSSProperties}>
              <h2>Declaration by the participant</h2>
              <p>By checking the I agree/start questionnaire option below:</p>
              <ul style={{ listStyle: "none", margin: 0 }}>
                {agree_statements.map((statement, index) => (
                  <li key={index} className="mb-3">
                    <div className='columns is-vcentered'>
                      <div className="mt-2"><statement.icon size="S" margin={"0 1.5rem"} color={statement.color} /></div>
                      <div className="column"><span>{statement.text}</span></div>
                    </div>
                  </li>
                ))}
              </ul>
            </TermsAndCondtitions>
          </TermsAndCondtitionsWrapper>
          <ButtonWrapper>
            <Button
              colour='accent'
              variant='fill'
              onClick={handleDoNotAgree}
            >I Do Not Agree</Button>
            <Button
              colour='accent'
              variant='fill'
              onClick={() => setPrintFormActive(true)}
            >Print Consent Form</Button>
            <Button
              colour='accent'
              variant='fill'
              onClick={handleNextPage}
            >I Agree</Button>
          </ButtonWrapper>
        </ContentWrapper>
      )}
      {page === 2 && (
        <ContentWrapper id="consent-form-page">
          <Title>My Details</Title>
          <Divider borderColor='#999' />
          <div className="container" style={{ "textAlign": "left", maxWidth: "800px", overflowY: "auto" }}>
            <form id="consent-data">
              <div className="field">
                <label className="label">Full Name<sup>*</sup></label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Full Name"
                    value={data.name}
                    onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Address (optional)</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Address"
                    value={data.address}
                    onChange={(e) => setData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email address<sup>*</sup></label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email address"
                    required
                    value={data.email}
                    onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <p className="help mt-4 mb-4">* is a required response</p>

              <div className="field">
                <label className="label">Optional Consent for reuse of data and future research:</label>
                <div className="control">
                  <Switch
                    isSelected={data.reuseData}
                    onChange={(e) => setData(prev => ({ ...prev, reuseData: e }))}>
                    {' I provide my consent for the information collected about me to be made available to other researchers as described at section 6 of this document.'}
                  </Switch>
                </div>
              </div>

              <div className="field">
                <label className="label">Email me a copy of the consent form: </label>
                <div className="control">
                  <Switch
                    isSelected={data.emailConsentForm}
                    onChange={(e) => setData(prev => ({ ...prev, emailConsentForm: e }))}>
                    {'I would like a copy of the consent form sent to my email upon submission.'}
                  </Switch>
                </div>
              </div>

              <div className="field">
                <label className="label">Acknowledgment of consent:</label>
                <div className="control">
                  <Switch
                    isSelected={data.detailsCorrect}
                    onChange={(e) => setData(prev => ({ ...prev, detailsCorrect: e }))}>
                    {' I understand all the above details are correct and by signing this form electronically is equivalent to signing a physical document.'}
                  </Switch>
                </div>
              </div>
            </form>
          </div>
          <ButtonWrapper>
            <Button
              colour='accent'
              variant='fill'
              onClick={handlePrevPage}
            >Go Back</Button>
            <Button
              colour='accent'
              variant='fill'
              onClick={() => setPrintFormActive(true)}
            >Print Consent Form</Button>
            <Button
              colour='accent'
              variant='fill'
              onClick={handleNextPage}
              disabled={!isDataValid}
            >Proceed</Button>
          </ButtonWrapper>
        </ContentWrapper>
      )}
    </PageWrapper>
  );
};

export default PatientParticipationStatement;