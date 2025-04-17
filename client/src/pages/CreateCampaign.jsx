import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const updateFormField = (field, event) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(campaignData.image, async (isValidImage) => {
      if (isValidImage) {
        try {
          setLoading(true);
          const formattedData = {
            ...campaignData,
            target: ethers.utils.parseUnits(campaignData.target, 18)
          };
          await createCampaign(formattedData);
          navigate('/');
        } catch (error) {
          console.error('Campaign creation failed:', error);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please enter a valid image URL.');
        setCampaignData({ ...campaignData, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] p-4 sm:p-10 flex flex-col items-center justify-center rounded-[10px]">
      {loading && <Loader />}

      <div className="bg-[#3a3a43] p-[16px] sm:min-w-[380px] flex justify-center items-center rounded-[10px]">
        <h1 className="text-white font-epilogue font-bold text-[18px] sm:text-[25px] leading-[38px]">
          Launch a New Campaign
        </h1>
      </div>

      <form onSubmit={handleCampaignSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Jane Smith"
            inputType="text"
            value={campaignData.name}
            handleChange={(e) => updateFormField('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Give your campaign a title"
            inputType="text"
            value={campaignData.title}
            handleChange={(e) => updateFormField('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Describe the story behind your campaign"
          isTextArea
          value={campaignData.description}
          handleChange={(e) => updateFormField('description', e)}
        />

        <div className="w-full bg-[#8c6dfd] h-[120px] rounded-[10px] flex items-center p-4">
          <img src={money} alt="campaign-funding" className="w-[40px] h-[40px] object-contain" />
          <h4 className="text-white text-[25px] font-epilogue font-bold ml-[20px]">
            You will receive 100% of the raised funds
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="e.g., ETH 0.75"
            inputType="text"
            value={campaignData.target}
            handleChange={(e) => updateFormField('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="Select deadline"
            inputType="date"
            value={campaignData.deadline}
            handleChange={(e) => updateFormField('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Paste a link to the image"
          inputType="url"
          value={campaignData.image}
          handleChange={(e) => updateFormField('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
