const axios = require('axios');
const crypto = require('crypto');
const config = require('../../config');

const collection = 'api-key';

const adminScopes = [
  'login:auth',
  'register:auth',
  'read:auth',
  'create:auth',
  'update:auth',
  'delete:auth',
  'read:user',
  'create:user',
  'update:user',
  'delete:user',
];

const publicScopes = [
  'login:auth',
  'register:auth',
  'read:auths',
  'read:users',
  'create:users',
  'delete:users',
  'update:users',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
    
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {

    const promises = apiKeys.map(async apiKey => {
      
        await axios({
          url: `${config.mongoService.host}:${config.mongoService.port}/${collection}`,
          method: 'post',
          data: apiKey,
        });
    });

    await Promise.all(promises);

      console.log(`${promises.length} api keys have been created succesfully`)
    
    return process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
    }
}
// DEBUG=app:* node scripts/mongo/seedApiKeys.js

seedApiKeys();
