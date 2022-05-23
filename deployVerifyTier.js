import * as rainSDK from "rain-sdk";

export default async function deployVerifyTier(signer) {
  try {
    const verifyTierAddress = '';

    console.log("Creating: Verify Tier Contract with the following State:", verifyTierAddress);
    const verifyTierContract = await rainSDK.verifyTier.deploy(signer, verifyTierAddress); // todo should this be then passed to the constructor in the sdk or used as is?
    console.log(`Result: Verify Tier Contract`, verifyTierContract);
    return verifyTierContract;
  } catch (err) {
    throw new Error('DeployVerifyTierError', `Error deploying Verify Tier`, err);
  }
}
