const test = require('node:test');
const assert = require('node:assert');
const { capitalize, reverse } = require('../src/utils/stringHelpers');

test('capitalize', () => assert.strictEqual(capitalize('git'), 'Git'));
test('reverse', () => assert.strictEqual(reverse('abc'), 'cba'));
