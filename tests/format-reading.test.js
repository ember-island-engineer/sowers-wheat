const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { formatReading } = require('../reading-format');

const title = '<h1>Reading title</h1>';

test('standalone scripture quotes become quotations while section titles stay headings', () => {
  const verse =
    'Matt.28:19 - “Go therefore and make disciples of all the nations…”';
  const result = formatReading(
    `${title}<h1>${verse}</h1><h1>Understanding the Love Plumb Line</h1>`
  );
  assert.ok(result.includes(`<blockquote><p>${verse}</p></blockquote>`));
  assert.ok(result.includes('<h1>Understanding the Love Plumb Line</h1>'));
  assert.ok(result.startsWith(title));
});

test('quoted words within a heading do not turn it into a quotation', () => {
  const input = `${title}<h1>Two phrases to avoid: “You always” and “You never”</h1>`;
  assert.equal(formatReading(input), input);
});

test('reflection prompts are paragraphs in one labelled box, including malformed exports', () => {
  for (const marker of [
    '<h1><em>Points to Ponder:</em></h1><h1>How can we show love?</h1>',
    '<h1>Points to Ponder:</p><p>How can we show love?</h1>',
  ]) {
    const result = formatReading(title + marker);
    assert.ok(
      result.includes(
        '<aside class="reflection" aria-label="Points to ponder">'
      )
    );
    assert.ok(result.includes('<p>How can we show love?</p>'));
    assert.equal((result.match(/<h1>/g) || []).length, 1);
    assert.equal(formatReading(result), result);
  }
});

test('formatting preserves every reading’s words and is idempotent', () => {
  const words = (html) =>
    html
      .replace(/<[^>]+>/g, ' ')
      .toLowerCase()
      .replace(/points? to ponder:/g, 'points to ponder')
      .replace(/\s+/g, ' ')
      .trim();
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.name.endsWith('.html')) {
        const source = fs.readFileSync(file, 'utf8');
        const formatted = formatReading(source);
        assert.equal(words(formatted), words(source), file);
        assert.equal(formatReading(formatted), formatted, file);
      }
    }
  };
  visit(path.join(__dirname, '../src/lib/data'));
});
