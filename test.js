const { blockstore, config } = require('./');
const test = require('tape');

test('repo config', tape => {
  tape.plan(1);
  config().then(({ repo, spec }) => tape.ok(Boolean(repo && spec)))
});

test('repo config with sharding & filestore enabled', tape => {
  tape.plan(1);
  config({
    sharding: true,
    filestore: true
  }).then(({ repo, spec }) => tape.ok(
    Boolean(
      repo.Experimental.ShardingEnabled && repo.Experimental.FilestoreEnabled
    )))
});

test('repo config with bootstrap for earth', tape => {
  tape.plan(1);
  config({
    bootstrapFor: 'earth'
  }).then(({ repo, spec }) => tape.ok(Boolean(repo.Bootstrap.length === 13)))
});
