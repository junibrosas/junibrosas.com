import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const BlogPosts = ({ posts }) => {
  return (
    <Section title="All Blog Posts">
      <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Small talks about my experience and journey in Software Development and
        the things I would like to share and excited to talk with you.
      </p>
      {posts.map((post) => (
        <SummaryItem
          key={post.node.fields.slug}
          name={post.node.frontmatter.title}
          description={post.node.frontmatter.description}
          link={post.node.fields.slug}
          internal
        />
      ))}
    </Section>
  );
};

export default BlogPosts;
