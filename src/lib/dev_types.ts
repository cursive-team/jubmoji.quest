export type Jubmoji = {
  pubKeyIndex: number; // Index of the card's public key within the list of public keys
  sig: string; // DER-encoded signature
  // msgNonce and msgRand are the counter and randomness used to generate signatures
  // See: https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign_random
  msgNonce: number;
  msgRand: string;
  // R, T, U are serialized points on the BabyJubjub curve represented in Edwards form.
  // They are based on the Efficient ECDSA formulation: https://personaelabs.org/posts/efficient-ecdsa-1/
  R: string;
  T: string;
  U: string;
};
