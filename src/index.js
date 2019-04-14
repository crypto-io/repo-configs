import { create } from 'peer-id';
import { merge } from 'lodash';
import { spec, repo, blockstore, bootstrap as bootstrapFor } from './config/index';
import keys from './keys';

/**
 * Returns config to pass to ipfs-repo when initializing & spec to write in repo as datastore_spec
 * @param {string} bootstrap include a bootstrap options: `earth`, default undefined
 * @param {boolean} filestore Allow files to be added without duplicating the space they take up on disk.
 * @param {boolean} sharding Enable directory sharding
 * @param {boolean} relayHop Enable node to act as relay
 */
const config = options => new Promise((resolve, reject) => {
  options = merge({
    sharding: false,
    filestore: false,
    relayHop: false,
    autoNAT: false,
    autoRelay: false,
    network: null,
    bootstrap: []
  }, options)

  const { ports, sharding, filestore, relayHop, autoNAT, autoRelay } = options;
  let { bootstrap, network } = options

  if (Array.isArray(bootstrap))
    bootstrap = bootstrap.map(string => {
      switch (string) {
        case 'default':
        case 'earth':
          return bootstrapFor['earth']
          break;
        case 'leofcoin':
          network = 'leofcoin';
          return bootstrapFor['leofcoin']
          break;
        case 'olivia':
          network = 'olivia';
          return bootstrapFor['olivia']
          break;
      }
      return string
    });

   if (typeof bootstrap === 'string') {
     if (bootstrap !== 'default' && bootstrap !== 'earth') network = bootstrap;
    bootstrap = bootstrapFor[bootstrap]
  }

  create({ bits: 2048 }, (error, generated) => {
    if (error) throw error;
    const { privKey, id, pubKey } = generated.toJSON();
    const config = repo;
    if (bootstrap) config.Bootstrap = bootstrap || [];
    if (ports) {
      if (ports.api) config.Addresses.API = config.Addresses.API.replace(5001, ports.api);
      if (ports.swarm) {
        config.Addresses.Swarm = config.Addresses.Swarm.map(address => address.replace(4001, ports.swarm));
        if (relayHop) config.Addresses.Swarm = [...config.Addresses.Swarm, ...config.Addresses.Swarm.map(address => address.replace(ports.swarm, `${ports.swarm + 3}/ws`))]
      }
      if (ports.gateway) config.Addresses.Gateway = config.Addresses.Gateway.replace(8080, ports.gateway);
    }
    config.Experimental.ShardingEnabled = sharding;
    config.Experimental.FilestoreEnabled = filestore;
    config.Swarm.EnableRelayHop = relayHop;
    config.Swarm.EnableAutoNATService = autoNAT;
    config.Swarm.EnableAutoRelay = autoRelay;
    config.Identity = {
      PeerID: id,
      PrivKey: privKey
    }

    resolve({
      repo: config,
      netkey: network ? keys(network) : null,
      spec
    });
  });
});
export {
  blockstore,
  spec,
  repo,
  config,
  keys
}
export default config;
