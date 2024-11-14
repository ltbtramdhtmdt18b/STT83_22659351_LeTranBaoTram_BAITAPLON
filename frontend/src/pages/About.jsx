import styled from "styled-components";
import GithubIcon from "../assets/icons/logo-github.svg";
const About = () => {
  return (
    <div>
      <Heading>
        <h1>About</h1>
        <p>This is sport equipment EC website.</p>
        <br />
        <br />
      </Heading>
    </div>
  );
};

const Heading = styled.div`
  margin-top: 8rem;
  text-align: center;
  display: block;

  a:nth-of-type(1) {
    border-bottom: violet solid 2px;
  }
`;

export default About;
