import styled from "styled-components";
import { ContextOptions } from "../../resources/questions/QuestionTypes/NumberQuestion";
import Markdown from "react-markdown";

const SurveyH2 = styled.h2`
  font-size: 2em;
  text-align: center;
  margin: 0.5rem auto;
  color: #000;
`;

const ContextSection = (props: { options?: ContextOptions, children: any}) => {
  if (props.children === undefined || props.children.length === 0) {
    return null;
  }
  if ((props.children as string).startsWith("link://")) {
    const link = (props.children as string).split("link:/")[1];
    return (
      <img style={{
        width: "50%",
        height: "auto",
        objectFit: "contain",
        margin: "0",

      }} src={link} alt="context" className="" />
    )
  }
  return (
    <span className="is-size-5 my-4 content" style={{
      color: props.options?.textColour || "#000",
    }}><Markdown>{props.children}</Markdown></span>
  )
}

export {
  SurveyH2,
  ContextSection
}