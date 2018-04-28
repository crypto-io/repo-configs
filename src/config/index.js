import blockstore from './templates/blockstore.json';
import repo from './templates/config.json';
import spec from './templates/spec.json';

import earth from './templates/bootstrap/earth.json';
import leofcoin from './templates/bootstrap/leofcoin/main.json';
import olivia from './templates/bootstrap/leofcoin/testnet.json';

const bootstrap = {
  earth,
  default: earth,
  leofcoin,
  olivia
}

export {
  blockstore,
  repo,
  spec,
  bootstrap
}
