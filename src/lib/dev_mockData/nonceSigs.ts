export type NonceSignature = {
  nonce: number;
  rand: string;
  sig: string;
  pubKeyIndex: number;
};

export const nonceSignatures: Record<string, NonceSignature> = {
  0: {
    nonce: 0,
    rand: "123456778987654324567865432abcda",
    sig: "3044022001f576031aaa42363cc23e7960fc1c62447d3bac21f3120d7806ebea999b3cca0220037649251bff919237c8b71d8642346d2ba0eba65cca3812c3f3096b88e2a7e1",
    pubKeyIndex: 0,
  },
  1: {
    nonce: 1,
    rand: "123456778987654324567865432abcda",
    sig: "30440220054ed3e7e22bfa31ccded3a13a626bd1042168b3fc4b3c380cf3e7dbcb7dae4a022001056df4b3535b5e63b00eeae32f757cbf632357e539a43a3956f8e5735b1c7f",
    pubKeyIndex: 0,
  },
  2: {
    nonce: 0,
    rand: "123456778987654324567865432abcda",
    sig: "3044022001f576031aaa42363cc23e7960fc1c62447d3bac21f3120d7806ebea999b3cca022002433eccf36e21fd35c368adbbb001643ca9325b2cc59735b27b2b231cfde8e0",
    pubKeyIndex: 1,
  },
  3: {
    nonce: 1,
    rand: "123456778987654324567865432abcda",
    sig: "30440220054ed3e7e22bfa31ccded3a13a626bd1042168b3fc4b3c380cf3e7dbcb7dae4a022005d2455e9ce1779c605b6d28b47a13fa41c1d6c14aae73690698072c7e27837b",
    pubKeyIndex: 1,
  },
  4: {
    nonce: 0,
    rand: "123456778987654324567865432abcda",
    sig: "3044022001f576031aaa42363cc23e7960fc1c62447d3bac21f3120d7806ebea999b3cca022000a3ab986b0136e00db5db76b70f13c124e0f813554e833a2ea80e0ccde03564",
    pubKeyIndex: 2,
  },
  5: {
    nonce: 1,
    rand: "123456778987654324567865432abcda",
    sig: "30440220054ed3e7e22bfa31ccded3a13a626bd1042168b3fc4b3c380cf3e7dbcb7dae4a022002b71e65c989cfe36077818af25a601922df876984c735cdea140c0c504133dd",
    pubKeyIndex: 2,
  },
};
