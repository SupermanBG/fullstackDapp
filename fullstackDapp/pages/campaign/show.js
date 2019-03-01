import React from 'react';
import Layout from '../../Components/Layout';
import Campaign from '../../ethereum/campaigns';
import {Card,Grid,Button} from 'semantic-ui-react';
import ContributeForm from '../../Components/contributeForm';
import {Link} from '../../routes';
import web3 from '../../ethereum/web3';
class Campaignshow extends React.Component{
  static async getInitialProps(props){
   //console.log(props.query.address);
   const campaign=Campaign(props.query.address);
    const summery = await campaign.methods.getSummery().call();
    //console.log(summery);
    return {
      address:props.query.address,
      minimumContribute:summery[0],
      balance:summery[1],
      requestount:summery[2],
      approvalCount:summery[3],
      manager:summery[4]
    };
  }
  renderCards(){
    const{
      address,
      minimumContribute,
      balance,
      requestcount,
      approvalCount,
      manager
    }=this.props
    const items = [
      {
        header:manager,
        meta:'管理者的地址',
        description:'当前管理者创建了众筹列表，并且是众筹的受益人',
       style:{overflowWrap:'break-word'}
     },
     {
       header:minimumContribute,
       meta:'最小贡献量',
       description:'如果你想对此众筹投资，你就需要至少大于当前金额',
      style:{overflowWrap:'break-word'}
    },
    {
      header:requestcount,
      meta:'请求数量',
      description:'当前的管理者创建请求从合约中提取金额，必须要大于50%的投资人同意',
     style:{overflowWrap:'break-word'}
   },
   {
     header:approvalCount,
     meta:'当前投资人数量',
     description:'已经为当前众筹投资的投资人数量',
    style:{overflowWrap:'break-word'}
  },
  {
    header:web3.utils.fromWei(balance,'ether'),
    meta:'当前众筹总金额(ether)',
    description:'当前众筹中已经筹集到的金额',
   style:{overflowWrap:'break-word'}
 },

    ];
    return <Card.Group  items={items}/>
  }
  render(){
    return (
      <Layout>
      <h1>众筹显示</h1>
      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>
          {this.renderCards()}
      </Grid.Column>
      <Grid.Column width={6}>
      <ContributeForm ddress={this.props.address}/>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
        <Link route={`/campaign/${this.props.address}/requests`}>
        <a>
        <Button primary>查看请求</Button>
        </a>
        </Link>
        </Grid.Column>
        </Grid.Row>
      </Grid>
      </Layout>
    );
  }
}
export default Campaignshow;
