const test = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply } = require('../src/utils/math');

test('add', () => assert.strictEqual(add(2, 3), 5));
test('subtract', () => assert.strictEqual(subtract(5, 3), 2));
test('multiply', () => assert.strictEqual(multiply(4, 3), 12));
