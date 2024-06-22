// --------------------------------------------------------------------------
export default function formatNote(markdown, options = {}) {
  const defaultOptions = {
    curlyDoubleQuotes: ['“', '”'],
    curlySingleQuotes: ['‘', '’'],
    arrowRight: '→',
    arrowLeft: '←'
  };

  // Merge user options with default options
  const config = { ...defaultOptions, ...options };

  const replacements = [
    {
      pattern: /""/g, replacement: (match, offset, string) => {
        const nextChar = string[offset + 2];
        return nextChar && /[a-zA-Z]/.test(nextChar) ? config.curlyDoubleQuotes[0] : config.curlyDoubleQuotes[1];
      }
    },
    {
      pattern: /''/g, replacement: (match, offset, string) => {
        const nextChar = string[offset + 2];
        return nextChar && /[a-zA-Z]/.test(nextChar) ? config.curlySingleQuotes[0] : config.curlySingleQuotes[1];
      }
    },
    { pattern: /\.\.\./g, replacement: '…' },
    { pattern: /->/g, replacement: config.arrowRight },
    { pattern: /<-/g, replacement: config.arrowLeft },
    { pattern: /<</g, replacement: '«' },
    { pattern: />>/g, replacement: '»' }
  ];

  replacements.forEach(({ pattern, replacement }) => {
    markdown = markdown.replace(pattern, replacement);
  });

  return markdown;
}
