import React from 'react'

const Profile = () => {
    return (
        <div className="container mx-auto p-4">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="h-24 w-24 rounded-full mr-4"
                    />
                    <div>
                        <h1 className="text-3xl font-semibold">John Doe</h1>
                        <p className="text-gray-600">@johndoe</p>
                        <p className="text-gray-600">Frontend Developer</p>
                    </div>
                </div>
                <div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Follow</button>
                </div>
            </div>

            {/* User Stats */}
            <div className="flex justify-between border-t border-b py-4">
                <div className="text-center">
                    <h2 className="font-semibold">Repositories</h2>
                    <p>10</p>
                </div>
                <div className="text-center">
                    <h2 className="font-semibold">Followers</h2>
                    <p>100</p>
                </div>
                <div className="text-center">
                    <h2 className="font-semibold">Following</h2>
                    <p>50</p>
                </div>
            </div>

            {/* Repository List */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Popular Repositories</h2>
                <div className="grid grid-cols-3 gap-4">
                    {/* Sample Repository Card */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Repository Name</h3>
                        <p className="text-gray-600 mb-4">Description of the repository.</p>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-gray-600">Language: JavaScript</p>
                                <p className="text-gray-600">Stars: 50</p>
                            </div>
                            <button className="bg-blue-500 text-white py-1 px-2 rounded-md">Star</button>
                        </div>
                    </div>
                    {/* More Repository Cards */}
                    {/* Add more repository cards here */}
                </div>
            </div>
        </div>
    );
};

export default Profile
