import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const { address, contract, getCampaigns } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [campaignList, setCampaignList] = useState([]);

  // Function to retrieve all campaigns from the blockchain contract
  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const fetchedCampaigns = await getCampaigns();
      setCampaignList(fetchedCampaigns);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (contract) {
      loadCampaigns();
    }
  }, [contract, address]);

  return (
    <DisplayCampaigns
      title="Explore All Campaigns"
      isLoading={loading}
      campaigns={campaignList}
    />
  );
};

export default Home;
