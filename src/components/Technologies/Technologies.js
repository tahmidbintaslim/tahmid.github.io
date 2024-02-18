  import React from 'react';
  import { DiFirebase, DiReact, DiZend } from 'react-icons/di';
  import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
  import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

  const Technologies = () =>  (
    <Section id="tech">
      <SectionDivider />
      <br />
      <SectionTitle>Technologies</SectionTitle>
      <SectionText>
        I am a versatile Full Stack Developer experienced in a wide array of technologies, including front-end, back-end, data Science, server operations, SEO, and problem-solving. My expertise extends to writing technical content on platforms like Medium and DEV.to. I enjoy tackling coding challenges and engaging in front-end development exercises on LeetCode and Codepen. This diverse skill set has enabled me to work across various languages, industries, and cultural environments in different work modes.
        <br />
        For more on my technical writings, visit <a href="https://tahmidbintaslimrafi.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a> and <a href="https://dev.to/tahmidbintaslim" target="_blank" rel="noopener noreferrer">DEV.to</a>.
        <br />
        To see my coding challenges and front-end projects, check out <a href="https://leetcode.com/tahmidbintaslimrafi/" target="_blank" rel="noopener noreferrer">LeetCode</a> and <a href="https://codepen.io/tahmid-bin-taslim" target="_blank" rel="noopener noreferrer">Codepen</a>.
        <br />
        Find my <a href="https://github.com/tahmidbintaslim" target="_blank" rel="noopener noreferrer">Github</a> and <a href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:41bd4034-db0a-447b-97dd-eca9519b33f4" target="_blank" rel="noopener noreferrer">Resume</a>
      </SectionText>
      <List>
        <ListItem>
          <DiReact size="3rem"/>
          <ListContainer>
            <ListTitle>Front-End</ListTitle>
            <ListParagraph>
              Experience with <br />
              React.js, Vue.js, Django, Flask.
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <DiFirebase size="3rem"/>
          <ListContainer>
            <ListTitle>Back-End</ListTitle>
            <ListParagraph>
              Experience with <br />
              Python, Node.js, PHP, API's, Databases, Docker, Kubernetes, Server & DevOPS.
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <DiZend size="3rem"/>
          <ListContainer>
            <ListTitle>UI/UX</ListTitle>
            <ListParagraph>
              Experience with <br />
              tools like Figma,XD and many other tools.
            </ListParagraph>
          </ListContainer>
        </ListItem>
      </List>
    </Section>
  );

  export default Technologies;
