import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import Dropzone from './Upload'
import SearchByTag from './searchByTag';
Amplify.configure(aws_exports);

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
