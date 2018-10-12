const cryptico = require('cryptico')

// The passphrase used to repeatably generate this RSA key.
const PassPhrase = process.env.CRYPTOPASSPHRASE

// The length of the RSA key, in bits.
const Bits = 1024;

const MjRSAkey = cryptico.generateRSAKey(PassPhrase, Bits)

const MjPublicKeyString = cryptico.publicKeyString(MjRSAkey)

module.exports = {
  MjRSAkey,
  MjPublicKeyString
}