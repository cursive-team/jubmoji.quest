import {
  MerkleProof,
  hexToBigInt,
  MERKLE_TREE_DEPTH,
  MERKLE_TREE_ZEROS,
} from "babyjubjub-ecdsa";

export const getMerkleTreeFromCache = (pubKeyList: string[]): string[][] => {
  // Todo: Either fetch from cache or recompute merkle tree and insert into cache
  throw new Error("Not implemented");
};

export const getMerkleRootFromTree = (tree: string[][]): bigint => {
  return BigInt(tree[-1][0]);
};

export const getMerkleRootFromCache = (pubKeyList: string[]): bigint => {
  const tree = getMerkleTreeFromCache(pubKeyList);

  return getMerkleRootFromTree(tree);
};

export const getMerkleProofFromCache = (
  pubKeyList: string[],
  leafIndex: number
): MerkleProof => {
  const tree = getMerkleTreeFromCache(pubKeyList);

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
