import * as rainSDK from "rain-sdk";

export default async function deployVerify(signer) {
  try {
    const address = await signer.getAddress()

    const verifyState = {
      admin: address // todo, check this in reality, this will be the address of a trusted third party verifier who will manually do KYC
    }

    console.log("Creating: Verify Contract for Verifying access to a page with the following State:", verifyState);
    const verifyContract = await rainSDK.Verify.deploy(signer, verifyState); // todo should this be then passed to the constructor in the sdk or used as is?
    console.log(`Result: Verify Contract`, verifyContract);
    return verifyContract;
  } catch (err) {
    console.log(err);
    throw new Error('DeployVerifyError', `Error deploying Verify`, err);
  }
}

  // ah so in a frontend, a user could 'nudge' an approver by clicking a button which calls 'requestApprove'
// and then maybe link the reader to an article about deleting root privileges and why it is good to do that
//   another option is to establish a DAO with a governance contract to hold the admin roles
