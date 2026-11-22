/** Give unambiguous legacy quote headings semantic markup, preserving the text. */
const formatReading = (html) => {
  const quoted = html.replace(
    /<h1>([\s\S]*?)<\/h1>/g,
    (heading, content, offset) => {
      // Keep the document title and malformed blocks for the existing title handling.
      if (!html.slice(0, offset).trim() || /<\/?p[\s>]/.test(content))
        return heading;
      const text = content.replace(/<[^>]+>/g, '').trim();
      const standaloneQuote =
        /^(?:[1-3]?\s*[A-Za-z. ]+\s*\d+:\d+[\w\d\s,:.–—-]*\s*[–—-]?\s*)?“[^“”]+”\s*(?:\([^()]+\))?[.!]?\s*$/;
      if (text.length < 40 || !standaloneQuote.test(text)) return heading;
      return `<blockquote><p>${content}</p></blockquote>`;
    }
  );

  // These concluding sections contain prompts, sometimes exported as broken h1/p
  // combinations. Keep their paragraphs together in a labelled reflection box.
  const marker =
    /<h1>\s*(?:<(?:strong|em)>\s*)*Points? to Ponder:\s*(?:<\/(?:strong|em)>\s*)*(<\/h1>|<\/p><p>)/i;
  const match = marker.exec(quoted);
  if (!match) return quoted;
  const prompts = quoted
    .slice(match.index + match[0].length)
    .replace(/<h1>/g, '<p>')
    .replace(/<\/h1>/g, '</p>');
  const opening = match[1] === '</p><p>' ? '<p>' : '';
  return `${quoted.slice(0, match.index)}<aside class="reflection" aria-label="Points to ponder"><p class="reflection-label">Points to ponder</p>${opening}${prompts}</aside>`;
};

module.exports = { formatReading };
