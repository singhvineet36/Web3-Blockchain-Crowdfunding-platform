import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Profile
} from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      {}
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      {/* Main content area — centers page with max width on desktop */}
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        {/* Routing all the main pages here — probably will add a 404 route later */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          {/* <Route path="*" element={<NotFound />} /> <-- maybe later */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
