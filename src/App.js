import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import Dropzone from './Upload'
import SearchByTag from './searchByTag';
import { Auth } from 'aws-amplify';
Amplify.configure(aws_exports);

Auth.currentSession().then(res => {
  let accessToken = res.getAccessToken()
  let jwt = accessToken.getJwtToken()
  //You can print them to see the full objects
  console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
  console.log(`myJwt: ${jwt}`)
})

class App extends Component {

  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        <Dropzone />
        <SearchByTag />
      </div>
    );
  }
}

export default withAuthenticator(App);
