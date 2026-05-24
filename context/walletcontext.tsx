"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

declare global {

  interface Window {
    ethereum?: any;
  }
}

type WalletContextType = {

  walletAddress: string;

  walletConnected: boolean;

  signature: string;

  connectWallet: () => Promise<void>;

  disconnectWallet: () => void;
};

const WalletContext =
  createContext<
    WalletContextType | undefined
  >(undefined);

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    walletAddress,
    setWalletAddress,
  ] = useState("");

  const [
    walletConnected,
    setWalletConnected,
  ] = useState(false);

  const [
    signature,
    setSignature,
  ] = useState("");

  // AUTO RECONNECT
  useEffect(() => {

    const savedWallet =
      localStorage.getItem(
        "portalproof_wallet"
      );

    const savedSignature =
      localStorage.getItem(
        "portalproof_signature"
      );

    if (
      savedWallet &&
      savedSignature
    ) {

      setWalletAddress(
        savedWallet
      );

      setSignature(
        savedSignature
      );

      setWalletConnected(
        true
      );
    }

  }, []);

  // CONNECT
  const connectWallet =
    async () => {

      try {

        if (
          !window.ethereum
        ) {

          toast.error(
            "MetaMask not installed"
          );

          return;
        }

        const accounts =
          await window.ethereum.request({
            method:
              "eth_requestAccounts",
          });

        const account =
          accounts[0];

        const message =
          "PortalProof Authentication Request";

        const signedMessage =
          await window.ethereum.request({

            method:
              "personal_sign",

            params: [
              message,
              account,
            ],
          });

        setWalletAddress(
          account
        );

        setWalletConnected(
          true
        );

        setSignature(
          signedMessage
        );

        // SAVE
        localStorage.setItem(
          "portalproof_wallet",
          account
        );

        localStorage.setItem(
          "portalproof_signature",
          signedMessage
        );

        toast.success(
          "Wallet connected"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Wallet connection failed"
        );
      }
    };

  // DISCONNECT
  const disconnectWallet =
    () => {

      setWalletAddress("");

      setWalletConnected(
        false
      );

      setSignature("");

      localStorage.removeItem(
        "portalproof_wallet"
      );

      localStorage.removeItem(
        "portalproof_signature"
      );

      toast.success(
        "Wallet disconnected"
      );
    };

  return (

    <WalletContext.Provider
      value={{
        walletAddress,
        walletConnected,
        signature,
        connectWallet,
        disconnectWallet,
      }}
    >

      {children}

    </WalletContext.Provider>
  );
}

export function useWallet() {

  const context =
    useContext(
      WalletContext
    );

  if (!context) {

    throw new Error(
      "useWallet must be used inside WalletProvider"
    );
  }

  return context;
}