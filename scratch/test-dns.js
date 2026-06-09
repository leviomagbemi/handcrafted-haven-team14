const dns = require('dns');

const hosts = [
  'ep-tiny-band-apm7v8d9-pooler.c-7.us-east-1.aws.neon.tech',
  'ep-tiny-band-apm7v8d9.c-7.us-east-1.aws.neon.tech',
  'google.com'
];

hosts.forEach(host => {
  dns.lookup(host, (err, address, family) => {
    if (err) {
      console.error(`dns.lookup for ${host} failed:`, err);
    } else {
      console.log(`dns.lookup for ${host} success: ${address} (family: ${family})`);
    }
  });
});
