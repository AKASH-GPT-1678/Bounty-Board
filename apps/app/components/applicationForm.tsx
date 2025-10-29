"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useWallet } from "../context/walletcontext";

interface ApplicationFormProps {
    bountyId: string; // passed as prop
}

interface FormData {
    applicant: string;
    coverLetter: string;
    proposal: string;
    workUrl: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ bountyId }) => {
    const { contract, address, signer } = useWallet();
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        if (!contract || !signer) {
            console.error("Wallet not connected");
            return;
        }

        try {
            console.log("Submitting application:", data);
            const tx = await contract.submitApplication(
                data.applicant,
                bountyId,
                data.coverLetter,
                data.proposal,
                data.workUrl
            );
            await tx.wait();
            alert("Application submitted successfully!");
            reset();
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100"
        >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Apply for Bounty
            </h2>

            {/* Applicant Address */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Address
                </label>
                <input
                    type="text"
                    {...register("applicant")}
                    value={address ?? ""}
                    readOnly
                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-600"
                />
            </div>

            {/* Cover Letter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                </label>
                <textarea
                    {...register("coverLetter", { required: true })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Write a short cover letter..."
                />
            </div>

            {/* Proposal */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proposal
                </label>
                <textarea
                    {...register("proposal", { required: true })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Describe your plan for completing this bounty..."
                />
            </div>

            {/* Work URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work URL
                </label>
                <input
                    type="url"
                    {...register("workUrl", { required: true })}
                    placeholder="https://yourportfolio.com/work"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-2 rounded-lg 
                   hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                Submit Application
            </button>
        </form>
    );
};

export default ApplicationForm;
