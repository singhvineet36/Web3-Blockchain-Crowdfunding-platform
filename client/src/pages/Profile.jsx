import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const { address, contract, getUserCampaigns } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);

  // Load campaigns created by the currently connected user
  const retrieveUserCampaigns = async () => {
    try {
      setLoading(true);
      const campaigns = await getUserCampaigns();
      setUserCampaigns(campaigns);
    } catch (err) {
      console.error('Error while fetching user campaigns:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (contract) {
      retrieveUserCampaigns();
    }
  }, [contract, address]);

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={loading}
      campaigns={userCampaigns}
    />
  );
};

export default Profile;
