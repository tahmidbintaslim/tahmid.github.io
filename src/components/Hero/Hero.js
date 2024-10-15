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
      HelIo,  I am Rafi, a versatile Software Engineer with over five years of experience in full stack development and data science. I specialize in creating scalable web solutions using technologies like React, Vue.js, Node.js, and PHP, along with expertise in SQL, NoSQL, MongoDB, and PostgreSQL. My strong foundation in Python, R, and MATLAB allows me to integrate machine learning and data analysis into innovative projects.

      I am passionate about solving complex problems and delivering high-quality, efficient solutions. My experience spans both technical development and leadership, driving team success through collaboration and cutting-edge technology. I’m excited to contribute to forward-thinking teams and impactful projects.
      </SectionText>
      <Button onClick={() => window.location = "https://iglu.net/talent/senior-software-developer/"}>Hire Me</Button>
    </LeftSection>
  </Section>
);

export default Hero;