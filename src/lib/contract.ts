import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";

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

    const api =
      await connectBlockchain();

    const contract =
      await loadContract();

    const keyring =
      new Keyring({
        type: "sr25519",
      });

    const alice =
      keyring.addFromUri("//Alice");

    const gasLimit =
      api.registry.createType(
        "WeightV2",
        {
          refTime:
            "10000000000",

          proofSize:
            "1000000",
        }
      );

    const tx =
      contract.tx.issueCredential(
        {
  gasLimit: gasLimit as any,
  storageDepositLimit: null,
},
        credentialId,
        recipient,
        title,
        course,
        grade,
      );

    return new Promise((resolve) => {

      tx.signAndSend(
        alice,

        (result) => {

          console.log(
            "ONCHAIN RESULT:",
            result.toHuman()
          );

          if (
            result.status.isInBlock ||
            result.status.isFinalized
          ) {

            resolve({

              success: true,

              network:
                "Local ink! Node",

              credentialId,

              recipient,

              title,

              course,

              grade,

              txHash:
                result.txHash.toString(),

              contract:
                contract.address.toString(),
            });
          }
        }
      );
    });

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

    const contract =
      await loadContract();

    const result =
      await contract.query.verifyCredential(

        CONTRACT_ADDRESS,

        {
          gasLimit: -1,
        },

        credentialId
      );

    return {

      success: true,

      credentialId,

      network:
        "Local ink! Node",

      result:
        result.output?.toHuman(),

      contract:
        contract.address.toString(),
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

    const api =
      await connectBlockchain();

    const contract =
      await loadContract();

    const keyring =
      new Keyring({
        type: "sr25519",
      });

    const alice =
      keyring.addFromUri("//Alice");

    const gasLimit =
      api.registry.createType(
        "WeightV2",
        {
          refTime:
            "10000000000",

          proofSize:
            "1000000",
        }
      );

    const tx =
      contract.tx.revokeCredential(
        {
  gasLimit: gasLimit as any,
  storageDepositLimit: null,

        },

        credentialId
      );

    return new Promise((resolve) => {

      tx.signAndSend(
        alice,

        (result) => {

          console.log(
            "REVOKE RESULT:",
            result.toHuman()
          );

          if (
            result.status.isInBlock ||
            result.status.isFinalized
          ) {

            resolve({

              success: true,

              credentialId,

              txHash:
                result.txHash.toString(),
            });
          }
        }
      );
    });

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

