"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation'
import NoBountyFound from '../components/nobountyfound';
import { useWallet } from '../context/walletcontext';
import { useRouter } from 'next/navigation';
const BountyView = () => {
    const { signer, address, connected, contract } = useWallet();
    const searchParams = useSearchParams();
    const [bounty, setBounty] = React.useState<any>(null);
    let id = searchParams.get('id');
    const router = useRouter();

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
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
            {bounty ? (
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-100">
                    <img
                        src={bounty.imageUrl}
                        alt="Bounty"
                        className="w-full h-64 object-cover rounded-xl"
                    />

                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">{bounty.title}</h1>
                        <p className="text-gray-600">{bounty.description}</p>

                        <div className="border-t border-gray-100 pt-3">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Expectation: </span>
                                {bounty.expectation}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Category: </span>
                                {bounty.category}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Deadline: </span>
                                {new Date(bounty.deadline * 1000).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Bounty Amount: </span>
                                {bounty.bountyAmount} wei
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Owner: </span>
                                {bounty.owner}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push(`apply?id=${id}`)}
                        className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg 
             hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md 
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            
                    >
                        Apply for Bounty
                    </button>

                </div>
            ) : (
                <NoBountyFound />
            )}
        </div>
    );
}

export default BountyView
