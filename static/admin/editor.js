CMS.registerEditorComponent({
  id: 'highlight-text',
  label: '형광펜',
  icon: 'ink_highlighter',
  type: 'inline',
  trigger: '==',
  pattern: /==(?<text>[^=\s](?:[^\r\n]*?[^=\s])?)==/,

  async onInsert({ selectedText = '' }) {
    const text = selectedText.trim();
    if (!text || /[\r\n]|==|^=|=$/.test(text)) {
      return null;
    }

    // Keep any selected spaces outside the Markdown delimiters.
    const start = selectedText.indexOf(text);
    return {
      text,
      before: selectedText.slice(0, start),
      after: selectedText.slice(start + text.length),
    };
  },

  toInline({ text = '강조할 글', before = '', after = '' }) {
    return `${before}==${text}==${after}`;
  },

  toPreview({ text = '', before = '', after = '' }) {
    const preview = document.createElement('span');
    const mark = document.createElement('mark');
    mark.textContent = text;
    preview.append(before, mark, after);
    return preview;
  },
});

if (window.katex && window.marked) {
  // Native MathML keeps the layout intact through Sveltia's preview sanitizer.
  // Strip the TeX annotation before the sanitizer unwraps it into plain text.
  const renderMath = (tex, displayMode = false) => window.katex.renderToString(tex, {
    displayMode,
    output: 'mathml',
    throwOnError: false,
    trust: false,
    maxSize: 20,
  }).replace(/<annotation\b[^>]*>[^<]*<\/annotation>/g, '');

  window.marked.use({
    extensions: [
      {
        name: 'blogMathBlock',
        level: 'block',
        tokenizer(source) {
          const match = /^\$\$[ \t]*\r?\n([\s\S]+?)\r?\n\$\$[ \t]*(?:\r?\n|$)/.exec(source);
          if (match?.[1].trim()) {
            return { type: 'blogMathBlock', raw: match[0], tex: match[1].trim() };
          }
        },
        renderer({ tex }) {
          return `<div class="blog-math-preview">${renderMath(tex, true)}</div>\n`;
        },
      },
      {
        name: 'blogMathInline',
        level: 'inline',
        start(source) {
          const index = source.search(/(?<![\\$])\$(?!\$)/);
          return index < 0 ? undefined : index;
        },
        tokenizer(source) {
          const match = /^\$(?!\$)((?:\\[^\r\n]|[^\\$`\r\n])+)\$(?![$\d])/.exec(source);
          if (match?.[1].trim()) {
            return { type: 'blogMathInline', raw: match[0], tex: match[1].trim() };
          }
        },
        renderer({ tex }) {
          return renderMath(tex);
        },
      },
    ],
  });

  CMS.registerPreviewStyle('.blog-math-preview { overflow-x: auto; }', {
    raw: true,
    collection: 'blog',
  });
}

CMS.init();
