import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center >
        Welcome to <br />
        Tahmid's World !
      </SectionTitle>
      <SectionText >
      Dynamic Senior Software Developer with 5+ years of hands-on experience in software engineering and web application development. Proven track record in spearheading high-impact projects, including creating Web Applications, custom WordPress websites and developing innovative e-commerce solutions. Skilled in collaborating with cross-functional teams to meet business requirements and drive scalability and maintainability. Proficient in a wide range of technologies, including Python, JavaScript, Node.js, and cloud platforms. Adept at leveraging machine learning and data science to optimize performance. Aiming to bring visionary leadership and expertise in software architecture to a forward-thinking organization.
      </SectionText>
      <Button onClick={() => window.location = "https://iglu.net/talent/senior-software-developer/"}>Hire Me</Button>
    </LeftSection>
  </Section>
);

export default Hero;