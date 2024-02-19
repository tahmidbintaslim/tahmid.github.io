  import React from 'react';
  import { DiFirebase, DiReact, DiStylus } from 'react-icons/di';
  import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
  import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

  const Technologies = () =>  (
    <Section id="tech">
      <SectionDivider />
      <br />
      <SectionTitle>Technologies</SectionTitle>
      <SectionText>
        I am a versatile Full Stack Developer experienced in a wide array of technologies, including front-end, back-end, data Science, server operations, SEO, and problem-solving.
      </SectionText>
      <List>
        <ListItem>
          <ListContainer>
            <ListTitle><DiReact size="5rem"/> Front-End</ListTitle>
            <ListParagraph>
              Experience with <br />
              React.js, Vue.js, Django, Flask.
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <ListContainer>
            <ListTitle><DiFirebase size="5rem"/> Back-End</ListTitle>
            <ListParagraph>
              Experience with <br />
              Python, Node.js, PHP, API's, Databases, Docker, Kubernetes, Server & DevOPS.
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <ListContainer>
            <ListTitle><DiStylus size="5rem"/> UI/UX</ListTitle>
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
