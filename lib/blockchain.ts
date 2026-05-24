import {
  ApiPromise,
  WsProvider,
} from "@polkadot/api";

let api: ApiPromise | null =
  null;

export async function connectBlockchain() {

  try {

    if (api) {
      return api;
    }

    const provider =
      new WsProvider(
        "wss://mainnet.portaldot.io"
      );

    api =
      await ApiPromise.create({
        provider,
      });

    console.log(
      "CONNECTED TO PORTALDOT MAINNET"
    );

    return api;

  } catch (error) {

    console.log(
      "BLOCKCHAIN CONNECTION ERROR:",
      error
    );

    throw error;
  }
}