const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(
    inputs
      .map((item) => JSON.stringify(item))
      .sort()
      .join(' ')
  );

  // digest is a term in cryptography to represent the result of the hash
  return hash.digest('hex');
};

module.exports = cryptoHash;
