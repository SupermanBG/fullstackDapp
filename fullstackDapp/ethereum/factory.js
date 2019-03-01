import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xd47208c6d58e43222e393d88C19c634b3fdd2ddE'
)
export default instance;
//0xd47208c6d58e43222e393d88C19c634b3fdd2ddE
