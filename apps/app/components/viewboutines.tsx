"use client"
import { set } from "react-hook-form";
import { useWallet } from "../context/walletcontext";
import React from "react";
import { useRouter } from "next/navigation";
export default function ViewBoutines() {
    const [boutines, setBoutines] = React.useState<any>([]);
    const { address, signer, connected, setAddress, setSigner, contract } = useWallet();
    const router = useRouter();

    const getBoutines = async (level: number) => {
        const randomArray = []

        for (let i = 0; i < level; i++) {
            const randomNum = Math.floor(Math.random() * 6) + 1; // random number 1–6
            randomArray.push(randomNum);
        };
        const tx = await contract?.loadBounties(randomArray);
        console.log(tx)

        console.log(tx[0]);



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
            getBoutines(3);
        }

    }, [contract])


    return (
        <div>
            <h1>View Boutines</h1>

            <div className="flex flex-row gap-6 flex-wrap">
                {
                    boutines &&

                    boutines.map((boutine: any, index: number) => (
                        <div key={index} className="max-w-[350px]">
                            <img src={boutine.image} alt={boutine.name} className="h-[200px] w-full  rounded-2xl shadow-2xl" />

                            <div className="mt-4 bg-gray-100 rounded-2xl p-2">


                                <h2>{boutine.name}</h2>
                                <p>{boutine.title}</p>
                                <p>{boutine.description}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                                    onClick={() => router.push(`/view?id=${index}`)}
                                >
                                    View Boutine
                                </button>
                            </div>
                        </div>
                    ))


                }
            </div>

        </div>
    );

}