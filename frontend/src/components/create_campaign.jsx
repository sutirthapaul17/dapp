'use client'; // If using Next.js App Router

import { useRouter } from 'next/navigation'; 

function CreateCampaign() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/campaign-form'); // Redirects to the form page
    };

    return (
        <button 
            onClick={handleClick} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Create Campaign
        </button>
    );
}

export default CreateCampaign;
