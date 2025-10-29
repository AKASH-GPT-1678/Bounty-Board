"use client"
import { set } from "react-hook-form";
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

        console.log(tx[0]);
        console.log(tx[1]);
        console.log(tx[2]);
        setBoutines(tx[0][5]);

        const bountiess = tx.map((item: any) => ({
            image: item[4],
            name: item[5],
            title: item[6],
            description: item[7],
        }));

        console.log(bountiess);
        setBoutines(bountiess);



    };

    React.useEffect(() => {
        if (contract) {
            getBoutines(6);
        }

    }, [contract])


    return (
        <div>
            <h1>View Boutines</h1>
        
            <div>
                {
                     boutines && 
                    boutines.map((boutine: any, index: number) => (
                        <div key={index}>
                            <img src={boutine.image} alt={boutine.name} />
                            <h2>{boutine.name}</h2>
                            <p>{boutine.title}</p>
                            <p>{boutine.description}</p>
                        </div>
                    ))

                }
            </div>

        </div>
    );

}