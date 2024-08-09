import React, { useState } from 'react';

const Consent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsent = () => {
    setConsentGiven(true);
  };

  return (
    <div>
      <h1>Consent Page</h1>
      {!consentGiven && (
        <button onClick={handleConsent}>Give Consent</button>
      )}
      {consentGiven && <p>Thank you for giving consent!</p>}
    </div>
  );
};

export default Consent;