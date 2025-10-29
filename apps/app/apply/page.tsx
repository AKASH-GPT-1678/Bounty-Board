"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ApplicationForm from '../components/applicationForm';
import NoBountyFound from '../components/nobountyfound';
const ApplyForBounty = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return (
        <div>
            {
                id ? (
                    <ApplicationForm bountyId={id} />
                ) : (
                    <NoBountyFound />
                )
            }

        </div>
    )
}

export default ApplyForBounty
