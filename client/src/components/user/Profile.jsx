import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

function Profile() {
    const { userprofile, isAuthenticated } = useContext(AppContext);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            userprofile()
                .then((response) => setProfileData(response.data))
                .catch((error) => console.error("Profile loading error:", error));
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <p className="text-center mt-5">Unauthorized: Please log in to view this page.</p>;
    }

    return (
        <div className="container mt-5 profileContainer">
            <h2 className="text-center mb-4">User Profile</h2>
            {profileData ? (
                <div className="card shadow-lg p-4">
                    <div className="card-body">
                        <h5 className="card-title">Profile Details</h5>
                        <p className="card-text"><strong>Name:</strong> {profileData.name}</p>
                        <p className="card-text"><strong>Email:</strong> {profileData.email}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
