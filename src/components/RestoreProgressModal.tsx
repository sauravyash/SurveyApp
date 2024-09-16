import { useEffect, useState } from "react";
import { useAnswerData } from "../reducers/AnswerDataProvider";
import { SurveyH2 } from "../pages/SurveyQuestionnaire/SurveyComponents";
import { ButtonGroup, Button as AdobeButton } from "@adobe/react-spectrum";
import { useNavigate } from "react-router-dom";

const RestoreProgressModal = (props: {onChange?: (value: boolean) => void}) => {
  const {onChange} = props;
  const [isRestoreProgressModalActive, setRestoreProgressModalActive] = useState(false);
  const {state, dispatch} = useAnswerData();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.session_data) {
      setRestoreProgressModalActive(true);
    }
  }, []);

  const onYes = () => {
    dispatch({ type: "restore_session_data" });
    setRestoreProgressModalActive(false);
    if (onChange) {
      onChange(true);
    }
  }

  const onNo = () => {
    dispatch({ type: "remove_session_data" });
    setRestoreProgressModalActive(false);
    if (onChange) {
      onChange(false);
    }
    navigate("/");
  }

  return (
    <div className={`modal ${isRestoreProgressModalActive && "is-active"}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}>
              <SurveyH2>Would you like to restore your previous progress?</SurveyH2>
              <ButtonGroup marginTop={"2rem"} UNSAFE_style={{justifyContent: "center"}}>
                <AdobeButton
                  variant="primary"
                  onPress={onYes}
                >
                  Yes
                </AdobeButton>
                <AdobeButton
                  variant="primary"
                  onPress={onNo}
                >
                  No
                </AdobeButton>
              </ButtonGroup>

            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => setRestoreProgressModalActive(false)}
            ></button>
          </div>
        </div>
  )
}

export default RestoreProgressModal;