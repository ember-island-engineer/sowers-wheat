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
        const body = source.replace(/<h1>[\s\S]*?<\/h1>/g, '');
        for (const paragraph of body.match(/<p>[\s\S]*?<\/p>/g) || []) {
          assert.ok(
            formatted.includes(paragraph),
            `Body paragraph changed: ${file}`
          );
        }
        assert.equal(formatReading(formatted), formatted, file);
      }
    }
  };
  visit(path.join(__dirname, '../src/lib/data'));
});

test('existing emphasized statements use callouts even without quotation marks', () => {
  const statement =
    'Personally, I am convicted that the family sphere is the foundation of all spheres. Let me explain.';
  const section =
    'Understanding the concept of the Love Plumb Line &amp; Mankind’s Love Deficit';
  const result = formatReading(
    `${title}<h1>${statement}</h1><h1>${section}</h1>`
  );
  assert.ok(result.includes(`<blockquote><p>${statement}</p></blockquote>`));
  assert.ok(result.includes(`<h1>${section}</h1>`));
});

test('ordinary paragraphs stay unchanged, even quoted text and reflection paragraphs', () => {
  const quote =
    '<p>The late Mother Theresa said it well, “If you want to change the world, go home and love your family”.</p>';
  const prompt = '<p>Are you intentionally building a healthy family?</p>';
  const result = formatReading(
    `${title}${quote}<h1>Points to Ponder:</h1>${prompt}`
  );
  assert.ok(result.includes(quote));
  assert.ok(result.includes(prompt));
  assert.ok(!result.includes('<blockquote>'));
  assert.ok(!result.includes('<aside'));
});

test('the supplied Seven Spheres examples use callouts without changing body text', () => {
  const source = fs.readFileSync(
    path.join(
      __dirname,
      '../src/lib/data/devotions/1)-Marriage/2)-The-Seven-Spheres.html'
    ),
    'utf8'
  );
  const result = formatReading(source);
  assert.match(result, /<blockquote><p>Personally, I am convicted/);
  assert.match(
    result,
    /<aside class="reflection"[^>]*><p class="reflection-label">Points to ponder<\/p><p>Are you intentionally/
  );
  assert.match(result, /<h1>Understanding the concept of the Love Plumb Line/);
  assert.match(result, /<p>The late Mother Theresa said it well,/);
  assert.ok(!result.includes('<blockquote><p>The late Mother Theresa'));
});
