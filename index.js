import { ethers } from "ethers";
import deployVerify from "./deployVerify.js";
import deployVerifyTier from "./deployVerifyTier.js";
const CHAIN_ID = 80001; // Mumbai (Polygon Testnet) Chain ID

// tutorial:
export async function runVerifyGating() {
  try {
    const {ethereum} = window;

    if (!ethereum) {
      console.log("No Web3 Wallet installed");
    }

    const provider = new ethers.providers.Web3Provider(ethereum, {
      name: 'Mumbai',
      chainId: CHAIN_ID,
    });

    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("Info: Your Account Address:", address);
    console.log('------------------------------'); // separator

    // Deploy Contracts
    const verifyContract = await deployVerify(signer); // Deploy Verify
    const verifyTierContract = await deployVerifyTier(signer, verifyContract); // Deploy Verify Tier Contract to be used in Sale
    console.log('------------------------------'); // separator

    // ### Interact with the newly deployed ecosystem

    console.log(`Granting you the APPROVER role.`);
    const approverRoleHash = await verifyContract.APPROVER();
    const grantResult = await verifyContract.grantRole(approverRoleHash, address); // todo may need to give self approver role
    console.log(`Info: Grant result:`, grantResult);

    console.log(`Info: Approving You:`);
    const ARBITRARY_IPFS_HASH = 'QmPWiSndGCZNxsBMdKxELfNHbcrxGMCBJjcXRhcWrw9JJ5';
    // const ARBITRARY_IPFS_HASH = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('QmPWiSndGCZNxsBMdKxELfNHbcrxGMCBJjcXRhcWrw9JJ5'));
    const approvalResult = await verifyContract.approve([{
      account: address,
      data: ARBITRARY_IPFS_HASH
    }])
    console.log(`Result: of Approval:`, approvalResult);


    console.log('------------------------------'); // separator
    console.log("Info: Done");

  } catch (err) {
    // separator
    console.log('------------------------------');
    console.log(`Info: Something went wrong:`, err);
  }
}

runVerifyGating();
