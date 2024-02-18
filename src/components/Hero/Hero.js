import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center >
        Welcome to <br />
        Tahmid's World 💻
      </SectionTitle>
      <SectionText >
        I am an accomplished Full Stack Developer with a strong foundation in Data Science and Software Engineering, obtained from Stamford International University in Bangkok. My professional journey began in 2018 with freelance projects during my university studies, evolving into contract and full-time roles before graduation. Over the past four years, I have leveraged my expertise across diverse industries, building engaging and functional websites and web applications. This experience has honed my skills and solidified my commitment to excellence in the tech field.
      </SectionText>
      <Button onClick={() => window.location = "https://www.linkedin.com/in/tahmid-bin-taslim/"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;