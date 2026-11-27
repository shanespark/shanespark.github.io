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

  async onEdit({ data }) {
    return data.highlighted === false ? null : { ...data, highlighted: false };
  },

  toInline({ text = '강조할 글', before = '', after = '', highlighted = true }) {
    const content = highlighted ? `==${text}==` : text;
    return `${before}${content}${after}`;
  },

  toPreview({ text = '', before = '', after = '', highlighted = true }) {
    // Sveltia parses and sanitizes string previews as Markdown.
    const content = highlighted ? `<mark>${text}</mark>` : text;
    return `${before}${content}${after}`;
  },
});

if (window.katex && window.marked) {
  const inlineMathPattern = /(?<![\\$])\$(?!\$)(?<tex>(?:\\[^\r\n]|[^\\$`\r\n])+)\$(?![$\d])/;
  const blockMathPattern = /^\$\$[ \t]*\r?\n(?<tex>[\s\S]+?)\r?\n\$\$[ \t]*(?=\r?$)/m;

  // Native MathML keeps the layout intact through Sveltia's preview sanitizer.
  // Strip the TeX annotation before the sanitizer unwraps it into plain text.
  const renderMath = (tex, displayMode = false) => window.katex.renderToString(tex, {
    displayMode,
    output: 'mathml',
    throwOnError: false,
    trust: false,
    maxSize: 20,
  }).replace(/<annotation\b[^>]*>[^<]*<\/annotation>/g, '');

  const promptForInlineMath = (initial = '') => {
    const tex = window.prompt('문장 안 수식 (LaTeX)', initial)?.trim();
    if (!tex) return null;

    const match = inlineMathPattern.exec(tex);
    if (match?.[0] === tex) return { tex: match.groups.tex };

    const markdown = `$${tex}$`;
    return inlineMathPattern.exec(markdown)?.[0] === markdown ? { tex } : null;
  };

  // Preserve LaTeX verbatim when the rich-text editor exports Markdown.
  CMS.registerEditorComponent({
    id: 'inline-math',
    label: '문장 안 수식',
    icon: 'functions',
    type: 'inline',
    trigger: '$',
    pattern: inlineMathPattern,
    async onInsert({ selectedText = '' }) {
      return promptForInlineMath(selectedText.trim());
    },
    async onEdit({ data }) {
      return promptForInlineMath(data.tex);
    },
    toInline({ tex = 'x_i' }) {
      return `$${tex}$`;
    },
    toPreview({ tex = 'x_i' }) {
      return renderMath(tex.trim());
    },
  });

  CMS.registerEditorComponent({
    id: 'block-math',
    label: '독립 수식',
    icon: 'functions',
    mode: 'dialog',
    fields: [{ name: 'tex', label: 'LaTeX', widget: 'text' }],
    pattern: blockMathPattern,
    toBlock({ tex = 'x_i' }) {
      return `$$\n${tex}\n$$`;
    },
    toPreview({ tex = 'x_i' }) {
      return `<div class="blog-math-preview">${renderMath(tex.trim(), true)}</div>`;
    },
  });

  window.marked.use({
    extensions: [
      {
        name: 'blogMathBlock',
        level: 'block',
        tokenizer(source) {
          const match = blockMathPattern.exec(source);
          if (match?.index === 0 && match.groups.tex.trim()) {
            return { type: 'blogMathBlock', raw: match[0], tex: match.groups.tex.trim() };
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
          const match = inlineMathPattern.exec(source);
          if (match?.index === 0 && match.groups.tex.trim()) {
            return { type: 'blogMathInline', raw: match[0], tex: match.groups.tex.trim() };
          }
        },
        renderer({ tex }) {
          return renderMath(tex);
        },
      },
    ],
  });
}

CMS.init();
