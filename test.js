const { blockstore, config } = require('./');
const test = require('tape');

test('repo config', tape => {
  tape.plan(1);
  config().then(({ repo, spec }) => tape.ok(Boolean(repo && spec)))
});
