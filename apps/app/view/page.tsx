"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation'
import NoBountyFound from '../components/nobountyfound';
import { useWallet } from '../context/walletcontext';
import { set } from 'react-hook-form';
const BountyView = () => {
    const { signer, address, connected, contract } = useWallet();
    const searchParams = useSearchParams();
    const [bounty, setBounty] = React.useState<any>(null);
    let id = searchParams.get('id');

    if (!id) return <NoBountyFound />;
React.useEffect(() => {
    if (signer && contract) {
        const loadBounty = async () => {
            try {
                const tx = await contract.getBounty(id);
                console.log("tx from contract:", tx);

                // Convert BigInt to string for safety when logging or displaying
                const formatted = {
                    owner: tx[0],
                    deadline: Number(tx[1]),
                    bountyAmount: Number(tx[2]),
                    category: Number(tx[3]),
                    imageUrl: tx[4],
                    description: tx[5],
                    expectation: tx[6],
                    title: tx[7],
                };

                console.log("formatted bounty:", formatted);
                setBounty(formatted);
            } catch (err) {
                console.error("Error loading bounty:", err);
            }
        };

        loadBounty();
    }
}, [id, signer, contract]);

    return (
        <div>

            <div>
                {
                    bounty && (
                        <div>
                            {
                              JSON.stringify(bounty)

                            }
                        
                         
                          
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default BountyView
