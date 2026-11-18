---
title: ''
summary: Shane Park’s academic homepage and AI security research notebook.
type: landing
sections:
- block: resume-biography-3
  content:
    username: me
    text: ''
    headings:
      about: Professional Summary
      education: Education
      interests: Interests
  design:
    background:
      gradient_mesh:
        enable: true
    name:
      size: md
    avatar:
      size: medium
      shape: circle
  id: summary
- block: markdown
  content:
    title: My Research
    subtitle: ''
    text: 'I study how internal representations shape model behavior, and how that understanding can help us build
      safer AI systems. My current work connects activation engineering, multimodal safety, and proactive protection
      against generative misuse.


      **VLM-CAST — Conditional Activation Steering for Safe Response Control in Vision Language Models**


      Exploring safe response control in vision-language models through activation engineering and conditional behavior
      steering.


      *Project Manager & Main AI Engineer · March 2026 – Present*


      **VXShield — Lightweight Voice Protection Against Deepfake Audio Generation**


      Developing proactive voice protection through perturbations designed to resist deepfake audio generation.


      *Lead Engineer · March 2026 – Present*'
  design:
    columns: '1'
  id: research
- block: collection
  content:
    title: Recent Publications
    text: ''
    filters:
      folders:
      - publications
      exclude_featured: false
    count: 5
  design:
    view: citation
  id: publications
---
