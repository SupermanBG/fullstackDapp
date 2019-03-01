import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card,Button} from 'semantic-ui-react';
import Layout from '../Components/Layout';
import {Link} from '../routes';

// export default ()=>{
//   return <h1>hello index </h1>;
// }

class Compaindex extends Component{

  static async getInitialProps(){
    const campaign = await factory.methods.getDeployedCampaign().call();
    return {campaign};
  }
  // async ComponentDidMount(){
  //   const compaign = factory.methods.getDeployedCampaign().call();
  //   console.log(compaign);
  //}
  renderCampaign(){
    const items = this.props.campaign.map(address=>{
          return{
            header:address,
            description:<Link route={`/campaign/${address}`}><a>查看众筹</a></Link>,
            fluid:true
          }
    });
    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
      <div>
      <h2>众筹列表</h2>
      <Link route='campaign/new'>
  <Button primary floated='right' content='创建众筹' icon='add circle' labelPosition='right' inverted color='blue'/>
  </Link>
   {this.renderCampaign()}
      </div>
      </Layout>
    );
  }
}
export default Compaindex;
