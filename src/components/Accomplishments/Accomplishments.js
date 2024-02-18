import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AccomplishmentsStyles';

// we kept the data inside our file instead of putting it on constants because it contains just 6 lines.
const data = [
  { number: 4, text: 'Years of Experience.'},
  { number: 60, text: 'Projects Done till date.', },
  { number: 4, text: 'Tech Blogs Published', },
  { number: 191, text: 'Github Stars', }
];

const Accomplishments = () => (
  <Section>
    <SectionTitle>Personal Accomplishments</SectionTitle>
    <Boxes>
      {data.map((card, i) => (
        <Box key={i}>
          <BoxNum>{card.number}+</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Accomplishments;
