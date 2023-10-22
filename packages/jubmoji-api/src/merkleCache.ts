// Functions related to caching merkle trees
import {
  MerkleProof,
  hexToBigInt,
  MERKLE_TREE_DEPTH,
  MERKLE_TREE_ZEROS,
  publicKeyFromString,
  computeMerkleRoot,
  computeMerkleProof,
} from "babyjubjub-ecdsa";

export const getMerkleTreeFromCache = (pubKeyList: string[]): string[][] => {
  // Todo: Either fetch from cache or recompute merkle tree and insert into cache
  throw new Error("Not implemented");
};

export const getMerkleRootFromTree = (tree: string[][]): bigint => {
  return BigInt(tree[-1][0]);
};

export const getMerkleProofFromTree = (
  tree: string[][],
  leafIndex: number
): MerkleProof => {
  let index = leafIndex;
  const pathIndices: number[] = [];
  const siblings: bigint[] = [];
  for (let i = 0; i < MERKLE_TREE_DEPTH; i++) {
    pathIndices.push(index % 2);
    const siblingIndex = index % 2 === 0 ? index + 1 : index - 1;
    const sibling =
      siblingIndex === tree[i].length
        ? BigInt(MERKLE_TREE_ZEROS[i])
        : hexToBigInt(tree[i][siblingIndex]);
    siblings.push(sibling);
    index = Math.floor(index / 2);
  }

  return {
    root: getMerkleRootFromTree(tree),
    pathIndices,
    siblings,
  };
};

export const getMerkleRootFromCache = async (
  pubKeyList: string[]
): Promise<bigint> => {
  const pubKeys = pubKeyList.map((pubKey) =>
    publicKeyFromString(pubKey).toEdwards()
  );

  return await computeMerkleRoot(pubKeys);
};

export const getMerkleProofFromCache = async (
  pubKeyList: string[],
  leafIndex: number
): Promise<MerkleProof> => {
  const pubKeys = pubKeyList.map((pubKey) =>
    publicKeyFromString(pubKey).toEdwards()
  );

  return await computeMerkleProof(pubKeys, leafIndex);
};

export const getMerkleProofListFromCache = async (
  pubKeyList: string[],
  leafIndices: number[]
): Promise<MerkleProof[]> => {
  const pubKeys = pubKeyList.map((pubKey) =>
    publicKeyFromString(pubKey).toEdwards()
  );

  return Promise.all(
    leafIndices.map(
      async (leafIndex) => await computeMerkleProof(pubKeys, leafIndex)
    )
  );
};
