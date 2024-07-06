import { Outlet } from "react-router-dom";

import React from 'react'
import MainComponent from "../../components/MainComponent";

const Dashboard = () => {
    return (
        <div className="h-screen w-full grid grid-cols-2" style={{
            gridTemplateColumns: '20% 80%'
        }}>
            <MainComponent />
            <div className="overflow-y-scroll" >
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard