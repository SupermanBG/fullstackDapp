import React,{Component} from 'react';
import {Link} from '../../../routes';
import {Button} from 'semantic-ui-react';
import Layout from '../../../Components/Layout';
import Campaign from '../../../ethereum/campaigns';
import { Table } from 'semantic-ui-react';
import RequestRow from '../../../Components/RequestRow';
class CampaignRequest extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const campaign = Campaign(address)
    const requestCount = campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();//总的投资人数量
    const requests = await Promise.all(
      Array(requestCount).fill().map((element,index)=>{
        return campaign.methods.requests(index).call()
      })
    )
   console.log(requests);
    return {address,requests,approversCount};
  }
  renderRow(){
   return this.props.requests.map((request,index,approversCount)=>{
     return (
      <RequestRow
      key={index}
      id={index}
      request={request}
      address={this.props.address}
      approversCount={this.props.approversCount}
      ></RequestRow>
       );
   });
}

  render(){
    //console.log(this.props.requests);
    const{HeaderCell,Row,Header} = Table;
  return (
    <Layout>
    <h3>请求列表</h3>
    <Link route={`/campaign/${this.props.address}/requests/new`}>
    <Button primary>增加请求</Button>
    </Link>
    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>描述</Table.HeaderCell>
        <Table.HeaderCell>总的金额(ether)</Table.HeaderCell>
        <Table.HeaderCell>受益人的地址</Table.HeaderCell>
        <Table.HeaderCell>同意的数量</Table.HeaderCell>
        <Table.HeaderCell>是否同意</Table.HeaderCell>
        <Table.HeaderCell>是否完成</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {this.renderRow()}
    </Table.Body>
    </Table>
    </Layout>
  );
  }
}
export default CampaignRequest;
