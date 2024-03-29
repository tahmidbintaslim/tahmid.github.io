import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section nopadding id="projects">
    <SectionDivider />
    <SectionTitle main >Projects</SectionTitle>
    <GridContainer>
    {projects.map(({id, image, title, description, tags, source, visit}) => (
      <BlogCard key={id}>
        <Img src={image} alt={title} />
        <TitleContent>
          <HeaderThree title>{title}</HeaderThree>
          <Hr />
        </TitleContent>
        <CardInfo> {description} </CardInfo>
        <div>
          <br></br>
          <TitleContent>Tech Stack</TitleContent>
          <TagList>
            {tags.map((tag,i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </TagList>
        </div>
        <UtilityList>
          <ExternalLinks href={visit} target="_blank">Code</ExternalLinks>
          <ExternalLinks href={source} target="_blank">Visit Website</ExternalLinks>
        </UtilityList>
      </BlogCard>
    ))}
    </GridContainer>
  </Section>
);

export default Projects;