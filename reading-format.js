const reflectionLabel = '<p class="reflection-label">Points to ponder</p>';
const reflectionBox = (content) =>
  `<aside class="reflection" aria-label="Points to ponder">${content}</aside>`;

// Word exports sometimes put multiple paragraphs inside a single heading.
const paragraphs = (content) =>
  `<p>${content.replace(/^\s*<p>/i, '').replace(/<\/p>\s*$/i, '')}</p>`;

/** Restyle existing heading emphasis across all readings; never promote body paragraphs. */
const formatReading = (html) => {
  let reflecting = false;
  const formatted = html.replace(
    /<h1>([\s\S]*?)<\/h1>/g,
    (heading, content, offset) => {
      // Preserve the document title for the existing leading-title handling.
      if (!html.slice(0, offset).trim()) return heading;
      const text = content
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const marker =
        /^\s*(?:<(?:strong|em)>\s*)*Points? to Ponder:\s*(?:<\/(?:strong|em)>\s*)*/i.exec(
          content
        );
      if (marker) {
        reflecting = true;
        const prompt = content
          .slice(marker[0].length)
          .replace(/^<\/p>\s*<p>/i, '');
        return prompt.trim()
          ? reflectionBox(reflectionLabel + paragraphs(prompt))
          : reflectionLabel;
      }
      if (!text) return heading;
      if (reflecting) return reflectionBox(paragraphs(content));

      const quotedPassage =
        /^[“"]/.test(text) || /\d\s*:\s*\d[^“]*“/.test(text);
      const sentence =
        text.split(/\s+/).length >= 7 && /[.!?][”"’\s)]*$/.test(text);
      const multipleSentences = text.length > 130 && /[.!?]\s+[A-Z]/.test(text);
      if (!quotedPassage && !sentence && !multipleSentences) return heading;
      return `<blockquote>${paragraphs(content)}</blockquote>`;
    }
  );

  // Join an existing reflection label only to an immediately adjacent heading
  // callout. Ordinary paragraphs between them remain outside and unchanged.
  return formatted.replace(
    /<p class="reflection-label">Points to ponder<\/p>\s*<aside class="reflection" aria-label="Points to ponder">/g,
    `<aside class="reflection" aria-label="Points to ponder">${reflectionLabel}`
  );
};

module.exports = { formatReading };
