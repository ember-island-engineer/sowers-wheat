const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readingSlug } = require('../reading-slugs');
const fs = require('node:fs');
const path = require('node:path');

test('reading slugs remove source numbering, punctuation, and extensions', () => {
  for (const [source, expected] of [
    ['2)-The-Seven-Spheres.html', 'the-seven-spheres'],
    ['Healing-our-Inner-Child', 'healing-our-inner-child'],
    [
      '9)-Restoring-&-Keeping-the-Joy-(2).html',
      'restoring-and-keeping-the-joy-2',
    ],
    ['1,2-&-3-John', '1-2-and-3-john'],
    ['God’s-Love', 'gods-love'],
  ]) {
    assert.equal(readingSlug(source), expected);
    assert.equal(readingSlug(expected), expected);
  }
});

test('every source reading maps to a unique clean URL', () => {
  const destinations = [];
  const root = path.join(__dirname, '../src/lib/data');
  const add = (dir, prefix) => {
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.html'))
        destinations.push(`${prefix}/${readingSlug(file)}`);
    }
  };
  for (const dir of ['articles', 'expositions'])
    add(path.join(root, dir), `/${dir}`);
  for (const type of fs.readdirSync(path.join(root, 'devotions'), {
    withFileTypes: true,
  })) {
    if (type.isDirectory())
      add(
        path.join(root, 'devotions', type.name),
        `/devotions/${readingSlug(type.name)}`
      );
  }
  assert.ok(destinations.length > 240);
  assert.equal(new Set(destinations).size, destinations.length);
  for (const destination of destinations) {
    assert.match(
      destination,
      /^\/(articles|expositions|devotions)\/[a-z0-9-]+(?:\/[a-z0-9-]+)?$/
    );
  }
});
