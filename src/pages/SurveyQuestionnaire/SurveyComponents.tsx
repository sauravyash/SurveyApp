import styled from "styled-components";

const SurveyH2 = styled.h2`
  font-size: 2em;
  text-align: center;
  margin: 0.5rem auto;
  color: #000;
`;

const ContextSection = (props: any) => {
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
        margin: "4rem 0 2rem",

      }} src={link} alt="context" className="" />
    )
  }
  return (
    <span className="is-size-5 p-6 my-4">{props.children}</span>
  )
}

export {
  SurveyH2,
  ContextSection
}