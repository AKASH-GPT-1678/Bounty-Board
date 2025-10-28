import { ethers } from 'ethers'

import { useWallet } from '../context/walletcontext';
const ConnectWallet = () => {

    const { address, signer, connected, setAddress, setSigner } = useWallet();


    const handleEthers = async () => {
        try {
            //@ts-ignore
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signerInstance = await provider.getSigner();
            const userAddress = await signerInstance.getAddress();

            setSigner(signerInstance);
            setAddress(userAddress);
            console.log("Connected address:", userAddress);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }
    const handleDisconnect = () => {
        setSigner(null);
        setAddress("");

        console.log("Wallet disconnected");
    };

    return (
        <div>

            <button onClick={handleEthers}>
                {connected ? address : "Connect Wallet"}
            </button>
            {signer && (
                <button onClick={handleDisconnect}>Disconnect</button>
            )}
        </div>
    )
}

export default ConnectWallet