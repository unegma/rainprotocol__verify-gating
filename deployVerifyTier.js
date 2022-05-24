import * as rainSDK from "rain-sdk";

export default async function deployVerifyTier(signer, verifyTier) {
  try {
    const verifyTierAddress = verifyTier.address;

    console.log("Creating: Verify Tier Contract with the following State:", verifyTierAddress);
    const verifyTierContract = await rainSDK.VerifyTier.deploy(signer, verifyTierAddress); // todo should this be then passed to the constructor in the sdk or used as is?
    console.log(`Result: Verify Tier Contract`, verifyTierContract);
    return verifyTierContract;
  } catch (err) {
    console.log(err);
    throw new Error('DeployVerifyTierError', `Error deploying Verify Tier`, err);
  }
}
