import { create } from 'peer-id';
import { spec, repo, blockstore, bootstrap } from './config/index';

// TODO: hardcoded swarm key for leofcoin?

/**
 * Returns config to pass to ipfs-repo when initializing & spec to write in repo as datastore_spec
 * @param {string} includeBootstrap include a bootstrap options: `earth`, default undefined
 * @param {boolean} filestore Allow files to be added without duplicating the space they take up on disk.
 * @param {boolean} sharding Enable directory sharding
 */
const config = options => new Promise((resolve, reject) => {
  const { bootstrapFor, sharding, filestore } = options || {
    sharding: false,
    filestore: false
  };
  if (bootstrapFor !== 'earth' &&
      bootstrapFor !== 'default' &&
      bootstrapFor !== undefined) reject(`Expected ${bootstrapFor} to be null or earth`);
  create({ bits: 2048 }, (error, generated) => {
    if (error) throw error;
    const { privKey, id, pubKey } = generated.toJSON();
    const config = repo;
    if (bootstrapFor) config.Bootstrap = bootstrap[bootstrapFor];
    config.Experimental.ShardingEnabled = sharding;
    config.Experimental.FilestoreEnabled = filestore;
    config.Identity = {
      PeerID: id,
      PrivKey: privKey
    }
    resolve({
      repo: config,
      spec
    });
  });
});
export {
  blockstore,
  spec,
  repo,
  bootstrap,
  config
}
export default config;
