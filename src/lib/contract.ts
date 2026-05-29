
import { ApiPromise, WsProvider } from "@polkadot/api";

import { ContractPromise } from "@polkadot/api-contract";

let api: ApiPromise | null = null;

let contract: ContractPromise | null = null;

const CONTRACT_ADDRESS =
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

export async function connectBlockchain() {

  if (!api) {

    const provider =
      new WsProvider(
        "ws://127.0.0.1:9944"
      );

    api =
      await ApiPromise.create({
        provider,
      });

    console.log(
      "CONNECTED TO LOCAL INK NODE"
    );
  }

  return api;
}

export async function loadContract() {

  if (contract) {
    return contract;
  }

  const api =
    await connectBlockchain();

  const metadata =
    require(
      "../../public/contracts/ink/portalproof_contract.json"
    );

  console.log(
    "INK CONTRACT METADATA LOADED"
  );

  contract =
    new ContractPromise(
      api,
      metadata,
      CONTRACT_ADDRESS
    );

  return contract;
}

export async function issueCredentialOnChain(
  credentialId: string,
  recipient: string,
  title: string,
  course: string,
  grade: string,
) {

  try {

    await connectBlockchain();

    console.log(
      "SIMULATED CONTRACT EXECUTION"
    );

    console.log({
      credentialId,
      recipient,
      title,
      course,
      grade,
    });

    return {

      success: true,

      simulated: true,

      network:
        "Local ink! Node",

      credentialId,

      recipient,

      title,

      course,

      grade,

      txHash:
        "0xSIMULATED_BLOCKCHAIN_HASH",
    };

  } catch (error) {

    console.log(
      "BLOCKCHAIN ERROR:",
      error
    );

    return {

      success: false,

      message:
        "Blockchain interaction failed",
    };
  }
}

export async function verifyCredentialOnChain(
  credentialId: string
) {

  try {

    await connectBlockchain();

    console.log(
      "SIMULATED VERIFY EXECUTION"
    );

    return {

      success: true,

      simulated: true,

      credentialId,

      verified: true,

      network:
        "Local ink! Node",
    };

  } catch (error) {

    console.log(
      "VERIFY ERROR:",
      error
    );

    return {

      success: false,
    };
  }
}

export async function revokeCredentialOnChain(
  credentialId: string
) {

  try {

    await connectBlockchain();

    console.log(
      "SIMULATED REVOKE EXECUTION"
    );

    
  } catch (error) {

    console.log(
      "REVOKE ERROR:",
      error
    );

    return {

      success: false,
    };
  }
}
