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

CMS.init();
