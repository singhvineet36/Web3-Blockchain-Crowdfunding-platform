import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from '../assets';

// Custom navigation structure for sidebar and routing
export const navigationItems = [
  {
    label: 'Dashboard',
    icon: dashboard,
    path: '/',
  },
  {
    label: 'Start Campaign',
    icon: createCampaign,
    path: '/create-campaign',
  },
  {
    label: 'Payments (Coming Soon)',
    icon: payment,
    path: '/',
    isDisabled: true,
  },
  {
    label: 'Withdraw Funds',
    icon: withdraw,
    path: '/',
    isDisabled: true,
  },
  {
    label: 'My Profile',
    icon: profile,
    path: '/profile',
  },
  {
    label: 'Log Out',
    icon: logout,
    path: '/',
    isDisabled: true,
  },
];

