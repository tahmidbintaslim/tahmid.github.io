import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center >
        Welcome to <br />
        Tahmid's Personal Portfolio
      </SectionTitle>
      <SectionText >
        Hi, I am Tahmid, versatile Full Stack Developer with a passion for creating beautiful and intuitive Websites and Web Applications. Around 2018, while doing my BS in IT(Data Science & Software Engineering) at Stamford Internation University Bangkok, Thailand, I started working on freelance projects. Thats evolves into some contract jobs and transitioned into Full Time Jobs before my graduation. Worked on several companies handling all kinds of web projects and gather different industry experience in last 4 years.
      </SectionText>
      <Button onClick={() => window.location = "https://www.linkedin.com/in/tahmid-bin-taslim/"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;