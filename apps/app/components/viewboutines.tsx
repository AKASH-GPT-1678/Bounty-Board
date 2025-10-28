"use client"
import { useWallet } from "../context/walletcontext";
import React from "react";
export default function ViewBoutines() {
    const [boutines, setBoutines] = React.useState<any>([]);
    const { address, signer, connected, setAddress, setSigner, contract } = useWallet();

    const getBoutines = async (level: number) => {
        const randomArray = []

        for (let i = 0; i < level; i++) {
            const randomNum = Math.floor(Math.random() * 6) + 1; // random number 1–6
            randomArray.push(randomNum);
        };
        const tx = await contract?.loadBounties(randomArray);

        console.log(tx);
        setBoutines(tx);

    };

    React.useEffect(() => {
        if (contract) {
            getBoutines(6);
        }

    }, [contract])


    return (
        <div>
            <h1>View Boutines</h1>
        </div>
    );

}