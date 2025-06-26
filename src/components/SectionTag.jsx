import React from 'react';
import '../App.css';

const SectionTag = ({ tag, children }) => (
  <section className="section-tag">
    <span className="tag">{tag}</span>
    {children}
  </section>
);

export default SectionTag; 