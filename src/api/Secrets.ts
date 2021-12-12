import crypto from 'crypto';

export const Secrets = ((crypto) => {

    const Secret = { 
        privateKey : 'd77f460f12d2539e4c00d07d9a5af3e4aa80faf4',
        publicKey: '7e277b72bd1229c637a761ad8c4e87f9',
        ts: Date.now().toString(),
        hash: "",
       }

       Secret.hash = crypto.createHash('md5').update(Secret.ts + Secret.privateKey + Secret.publicKey).digest('hex');

  return Secret;
})(crypto);