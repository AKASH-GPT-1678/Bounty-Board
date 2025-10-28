"use client";
import { ethers } from "ethers";
import React from "react";

type WalletContextType = {
    signer: ethers.Signer | null;
    address: string | null;
    connected: boolean;
    setSigner: React.Dispatch<React.SetStateAction<ethers.Signer | null>>;
    setAddress: React.Dispatch<React.SetStateAction<string | null>>;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

const WalletContext = React.createContext<WalletContextType>({
    signer: null,
    address: null,
    connected: false,
    setSigner: () => { },
    setAddress: () => { },
    setConnected: () => { },
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [signer, setSigner] = React.useState<ethers.Signer | null>(null);
    const [address, setAddress] = React.useState<string | null>(null);
    const [connected, setConnected] = React.useState<boolean>(false);

    React.useEffect(() => {
        const initWallet = async () => {

            if (!window.ethereum) { console.log("No wallet detected"); return; }

            try {
                console.log("Initializing wallet...");
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                console.log("Accounts:", accounts);

                if (accounts.length > 0) {
                    setConnected(true);
                    const signerInstance = await provider.getSigner();
                    const userAddress = await signerInstance.getAddress();
                    console.log("Connected address:", userAddress);

                    setSigner(signerInstance);
                    setAddress(userAddress);

                    console.log("Wallet auto-initialized:", userAddress);
                }
                else {
                    setConnected(false);


                }
            } catch (err) {
                console.error("Wallet init error:", err);
            }
        };

        initWallet();
    }, []);

    return (
        <WalletContext.Provider value={{ signer, address, connected, setSigner, setAddress, setConnected }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => React.useContext(WalletContext);

export default WalletProvider;