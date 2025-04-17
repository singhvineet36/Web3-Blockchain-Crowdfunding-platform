import React, { createContext, useContext } from 'react';
import {
  useContract,
  useContractWrite,
  useAddress,
  useMetamask
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

// Creating a custom context to share Web3 state across the app
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const userAddress = useAddress();
  const connectWithMetamask = useMetamask();

  const { contract } = useContract('0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9');
  const { mutateAsync: writeNewCampaign } = useContractWrite(contract, 'createCampaign');

  // Submit a new campaign to the smart contract
  const submitCampaign = async (form) => {
    try {
      const tx = await writeNewCampaign({
        args: [
          userAddress,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log('✅ Campaign successfully submitted:', tx);
    } catch (error) {
      console.error('❌ Error creating campaign:', error);
    }
  };

  // Retrieve all campaigns deployed via the contract
  const loadAllCampaigns = async () => {
    try {
      const campaigns = await contract.call('getCampaigns');

      return campaigns.map((c, idx) => ({
        owner: c.owner,
        title: c.title,
        description: c.description,
        target: ethers.utils.formatEther(c.target.toString()),
        deadline: c.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(c.amountCollected.toString()),
        image: c.image,
        pId: idx,
      }));
    } catch (error) {
      console.error('⚠️ Could not load campaigns:', error);
      return [];
    }
  };

  // Fetch only those campaigns started by the connected wallet
  const loadUserCampaigns = async () => {
    const all = await loadAllCampaigns();
    return all.filter(c => c.owner === userAddress);
  };

  // Donate ETH to a specific campaign by ID
  const donateToCampaign = async (campaignId, amountInEth) => {
    try {
      const tx = await contract.call('donateToCampaign', [campaignId], {
        value: ethers.utils.parseEther(amountInEth),
      });
      return tx;
    } catch (error) {
      console.error('💸 Donation failed:', error);
    }
  };

  // Get all donors and their contributions for a given campaign
  const retrieveDonations = async (campaignId) => {
    try {
      const [donators, donations] = await contract.call('getDonators', [campaignId]);
      const totalDonations = donators.length;

      return Array.from({ length: totalDonations }, (_, i) => ({
        donator: donators[i],
        donation: ethers.utils.formatEther(donations[i].toString()),
      }));
    } catch (error) {
      console.error('🧾 Error fetching donation details:', error);
      return [];
    }
  };

  return (
    <AppContext.Provider
      value={{
        userAddress,
        connectWithMetamask,
        contract,
        submitCampaign,
        loadAllCampaigns,
        loadUserCampaigns,
        donateToCampaign,
        retrieveDonations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom React hook for accessing the Web3 app context
export const useAppContext = () => useContext(AppContext);
