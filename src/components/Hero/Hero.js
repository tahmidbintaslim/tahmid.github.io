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
        Full Stack Developer with a solid background in Data Science and Software Engineering from Stamford International University, I've been transforming ideas into digital realities since 2018. From freelance to full-time, my journey is marked by a relentless pursuit of excellence, creating captivating websites and web applications that stand out in various industries. Let's build the future together.
      </SectionText>
      <Button onClick={() => window.location = "https://www.linkedin.com/in/tahmid-bin-taslim/"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;