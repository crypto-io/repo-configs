import blockstore from './templates/blockstore.json';
import repo from './templates/config.json';
import spec from './templates/spec.json';

import earth from './templates/bootstrap/earth.json';

const bootstrap = {
  earth,
  default: earth
}

export {
  blockstore,
  repo,
  spec,
  bootstrap
}
