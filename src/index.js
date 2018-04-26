import { create } from 'peer-id';
import { spec, repo, blockstore, bootstrap } from './config/index';

// TODO: hardcoded swarm key for leofcoin?

/**
 * Returns config to pass to ipfs-repo when initializing & spec to write in repo as datastore_spec
 * @param {string} bootstrapFor include a bootstrap options: `earth`, default undefined
 * @param {boolean} filestore Allow files to be added without duplicating the space they take up on disk.
 * @param {boolean} sharding Enable directory sharding
 * @param {boolean} relayHop Enable node to act as relay
 */
const config = options => new Promise((resolve, reject) => {
  const { bootstrapFor, sharding, filestore, relayHop, ports } = options || {
    sharding: false,
    filestore: false,
    relayHop: false
  };
  if (bootstrapFor !== 'earth' &&
      bootstrapFor !== 'default' &&
      bootstrapFor !== undefined) reject(`Expected ${bootstrapFor} to be undefined or earth`);
  create({ bits: 2048 }, (error, generated) => {
    if (error) throw error;
    const { privKey, id, pubKey } = generated.toJSON();
    const config = repo;
    if (bootstrapFor) config.Bootstrap = bootstrap[bootstrapFor] || [];
    if (ports) {
      if (ports.api) config.Addresses.API = config.Addresses.API.replace(5001, ports.api);
      if (ports.swarm) config.Addresses.Swarm = config.Addresses.Swarm.map(address => address.replace(4001, ports.swarm));
      if (ports.gateway) config.Addresses.Gateway = config.Addresses.Gateway.replace(8080, ports.gateway);
    }
    config.Experimental.ShardingEnabled = sharding;
    config.Experimental.FilestoreEnabled = filestore;
    config.Experimental.EnableRelayHop = relayHop;
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
