import generate from 'ipfs-key-gen';

// TODO: hardcoded swarm key for leofcoin?

export const blockstore = {
  "Datastore": {
    "BloomFilterSize": 0,
    "GCPeriod": "1h",
    "HashOnRead": false,
    "Spec": {
      "mounts": [
        {
          "child": {
            "path": "blocks",
            "shardFunc": "/repo/flatfs/shard/v1/next-to-last/2",
            "sync": true,
            "type": "flatfs"
          },
          "mountpoint": "/blocks",
          "prefix": "flatfs.datastore",
          "type": "measure"
        }
      ],
      "type": "mount"
    },
    "StorageGCWatermark": 90,
    "StorageMax": "10GB"
  }
}

const repo = {
  API: {
    HTTPHeaders: {
      'Access-Control-Allow-Methods': [
      	'PUT',
      	'POST',
      	'GET'
      ],
      'Access-Control-Allow-Origin': [
      	'*'
      ]
    }
  },
  Addresses: {
  	API: '/ip4/127.0.0.1/tcp/5001',
  	Announce: null,
  	Gateway: '/ip4/127.0.0.1/tcp/9090',
  	NoAnnounce: null,
  	Swarm: [
  		'/ip4/127.0.0.1/tcp/4001'
  	]
  },
  Bootstrap: [],
  Datastore: {
  	BloomFilterSize: 0,
  	GCPeriod: '1h',
  	HashOnRead: false,
    Spec: {
  	  mounts: [{
      child: {
      	path: 'blocks',
      	shardFunc: '/repo/flatfs/shard/v1/next-to-last/2',
      	sync: true,
      	type: 'flatfs'
      },
      mountpoint: '/blocks',
  		prefix: 'flatfs.datastore',
  		type: 'measure'
      }, {
      child: {
        compression: 'none',
        path: 'datastore',
        type: 'levelds'
      },
      mountpoint: '/',
      prefix: 'leveldb.datastore',
      type: 'measure'
    }],
    type: 'mount'
  },
  StorageGCWatermark: 90,
  StorageMax: '10GB'
  },
  Discovery: {
    MDNS: {
    	Enabled: true,
    	Interval: 10
    }
  },
  Experimental: {
    FilestoreEnabled: true,
    Libp2pStreamMounting: false,
    ShardingEnabled: true
  },
  Gateway: {
    HTTPHeaders: {
      'Access-Control-Allow-Headers': [
      	'X-Requested-With',
      	'Range'
      ],
      'Access-Control-Allow-Methods': [
      	'GET'
      ],
      'Access-Control-Allow-Origin': [
      	'*'
      ]
    },
  	PathPrefixes: [],
  	RootRedirect: '',
  	Writable: false
  },
  Ipns: {
  	RecordLifetime: '',
  	RepublishPeriod: '',
  	ResolveCacheSize: 128
  },
  Mounts: {
  	FuseAllowOther: false,
  	IPFS: '/ipfs',
  	IPNS: '/ipns'
  },
  Reprovider: {
  	Interval: '12h',
  	Strategy: 'all'
  },
  Swarm: {
  	AddrFilters: null,
  	ConnMgr: {
  		GracePeriod: '20s',
  		HighWater: 900,
  		LowWater: 600,
  		Type: 'basic'
	  },
  	DisableBandwidthMetrics: false,
  	DisableNatPortMap: false,
  	DisableRelay: false,
  	EnableRelayHop: false
  }
};

export const spec = {
  "mounts": [{
    "mountpoint":"/blocks",
    "path":"blocks",
    "shardFunc":"/repo/flatfs/shard/v1/next-to-last/2",
    "type":"flatfs"
  }, {
    "mountpoint":"/",
    "path":"datastore",
    "type":"levelds"
  }],
  "type":"mount"
};

export const bootstrap = [
  '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
  '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
  '/dnsaddr/bootstrap.libp2p.io/ipfs/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
  '/dnsaddr/bootstrap.libp2p.io/ipfs/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
  '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  '/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
  '/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
  '/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
  '/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
  '/ip6/2604:a880:1:20::203:d001/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
  '/ip6/2400:6180:0:d0::151:6001/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
  '/ip6/2604:a880:800:10::4a:5001/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
  '/ip6/2a03:b0c0:0:1010::23:1001/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd'
];

/**
 * Returns config to pass to ipfs-repo when initializing & spec to write in repo as datastore_spec
 * @param {boolean} includeBootstrap include default bootstrap when true, default false
 */
export const config = (includeBootstrap = false) => new Promise((resolve, reject) => {
 generate((error, {privKey, peerID}) => {
   if (error) throw error;
   const config = repo;
   if (includeBootstrap) config.Bootstrap = bootstrap;
   config.Identity = {
     PeerID: peerID,
     PrivKey: privKey
   }
   resolve({
     repo: config,
     spec
   })
 })
});
export default config;
