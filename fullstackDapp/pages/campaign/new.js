import React,{Component} from 'react';
import Layout from '../../Components/Layout';
import { Button,Form,Input} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Message } from 'semantic-ui-react';
import {Router} from '../../routes'
class CampaignNew extends Component{
  state ={
    minimum:'',
    errorMessage:'',
    loading:''
  };
  onSubmit = async()=>{
     this.setState({errorMessage:''});
     this.setState({loading:true});
    try{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimum).send({from:accounts[0]});
      Router.pushRoute('/');
    }catch(err){
         this.setState({errorMessage:err.message});
    }
     this.setState({loading:false});
  }
  render(){
    console.log(this.state.minimum);
  return (
     <Layout>
    <h3>创建你的众筹项目</h3>

    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

    <Form.Field>
    <label>最小投资金额</label>
    <Input  label='ether' labelPosition='right'
     value={this.state.minimun}
     onChange={event=>this.setState({minimum:event.target.value})}
    />
    </Form.Field>
    <Button primary loading={this.state.loading}>参与众筹</Button>
    <Message error header='错误!' content={this.state.errorMessage}/>
    </Form>

   </Layout>
    );
  }
}
export default CampaignNew;
