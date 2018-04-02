# repo-configs
> IPFS repo configs including PeerID, PrivKey & datastore_spec

```js
import { blockstore, config } from 'repo-configs';
config.then(({spec, repo}) => {
  writeFileSync(join(repoPath, 'datastore_spec'), JSON.stringify(spec, null, '\t'));
  writeFileSync(join(repoPath, 'config'), JSON.stringify(repo, null, '\t'));
  
  // or
  repo.init(repo) // full config
  
  repo.init(blockstore) // minimal config for working with the blockstore  
})

```
### API
#### config
