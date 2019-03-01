import React from 'react';
import Header from '../Components/header';
import { Container } from 'semantic-ui-react'
export default props=>{
  return(
   <Container>
   <link rel="stylesheet"href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"></link>
    <div>
   <Header/>
    {props.children}
    </div>
    </Container>
  );
}
