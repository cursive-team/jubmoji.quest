import { HaLoNoncePCD } from "@pcd/halo-nonce-pcd";

export function attestationText(pcd: HaLoNoncePCD): string | undefined {
  const pubkeyHex = pcd.claim.pubkeyHex.toLowerCase();
  if (
    pubkeyHex ===
    "04fb555ebebc95a418838616f3e551eab14feb0464906c611aa8144b0b11259b8e5f81d2ef92cdc022ce017c9e3d3952fcc05ccedb9b83ea4da10552fd3bf44f1e"
  ) {
    return "Your kindness is seen";
  }

  if (
    pubkeyHex ===
      "04cf92e6ba430b9850fb9d32f37205cd0824ffacf9d67db38dada0e38a22722556b376390fecda5c3672e1b1a96d10c758841623f709420bb4c778d8620aa21694" &&
    pcd.claim.nonce > 114
  ) {
    return "Attended FtC Demos";
  }

  if (
    pubkeyHex ===
      "04a3ae5686a386576dc4c0ad7a670c96582ecef62435e36ee8267d23ed1af6f286b84005a67d46c23ff45ed1f1211622da8e3b6d2ebeb14acba8b65a2073c68402" &&
    pcd.claim.nonce < 17
  ) {
    return "Attended ZK Alpha Day";
  }

  if (
    pubkeyHex ===
    "04ddaf8c2c9c6f12db6455d5cdcae27cf92551f574d1fdeca48aa7ba19c54e9b5d6f7089d825fff4d9918509c026b2fa19ecb05286f8c268e84ae0cc926cceac6d"
  ) {
    return "Curiosity jackpot!!";
  }

  return undefined;
}
