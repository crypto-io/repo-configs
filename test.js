const {blockstore} = require('./');
if (blockstore && blockstore.Datastore) return 0;
return 1;
