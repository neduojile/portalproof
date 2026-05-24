import { ApiPromise, WsProvider } from "@polkadot/api";

import { ContractPromise } from "@polkadot/api-contract";

import {
  web3Enable,
  web3Accounts,
} from "@polkadot/extension-dapp";



let api: ApiPromise;



export async function connectBlockchain() {

  if (!api) {

    const provider =
      new WsProvider(
        "wss://rpc.shibuya.astar.network"
      );

    api =
      await ApiPromise.create({
        provider,
      });
  }

  return api;
}



export async function connectWallet() {

  await web3Enable(
    "PortalProof"
  );

  const accounts =
    await web3Accounts();

  return accounts;
}



export async function loadContract(
  contractAddress: string
) {

  const api =
    await connectBlockchain();

  const response =
    await fetch(
      "/contracts/portalproof_contract.json"
    );

  const metadata =
    await response.json();

  const contract =
    new ContractPromise(
      api,
      metadata,
      contractAddress
    );

  return contract;
}