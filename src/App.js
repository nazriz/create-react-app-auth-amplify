import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import DropzoneItag from './Upload_itag'
import DropzoneImageForImage from './Upload_imageforimage'
import SearchByTag from './searchByTag';
import DeleteItem from './Delete_item';
import AddImageTags from './addImageTags';
import RemoveImageTags from './removeImageTags'
import { Auth } from 'aws-amplify';
import { NavLink, Routes, Route } from 'react-router-dom';
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
        <h1>Welcome to the Object Detection Web Application</h1>
        <AmplifySignOut />
        <Navigation />
        <Main />
      </div>
    );
  }
}



const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="home" to='/'>Upload Image</NavLink></li>
      <li><NavLink exact activeClassName="about" to='/imgforimage'>Search Images by Uploading an Image</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/imgfortag'>Search Images By Tags</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/addtag'>Add Tags</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/removeimagetags'>Remove Image Tags</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/deleteitem'>Delete Items</NavLink></li>
    </ul>
  </nav>
);

const Home = () => (
  <div className='home'>
    <p> Upload Image</p>
    <DropzoneItag />
  </div>
);

const ImgForImage = () => (
  <div className='about'>
    <p> Search Image for Images</p>
    <DropzoneImageForImage />
  </div>
  );

const ImgForTag = () => (
  <div className='ImgForTag'>
    <p> Search Image By Tags</p>
    <SearchByTag />
  </div>
  );
    
const AddTag = () => (
  <div className='AddTag'>
    <p> Add Tags</p>
    <AddImageTags />
  </div>
);

const RemoveImageTagss = () => (
  <div className='RemoveImageTags'>
    <p> Remove Tags</p>
    <RemoveImageTags />
  </div>
);

const DeleteItems = () => (
  <div className='DeleteItem'>
    <p> Delete Items</p>
    <DeleteItem />
  </div>
);

const Main = () => (
  <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/ImgForImage' element={<ImgForImage/>}></Route>
      <Route path='/ImgForTag' element={<ImgForTag/>}></Route>
      <Route path='/AddTag' element={<AddTag/>}></Route>
      <Route path='/RemoveImageTags' element={<RemoveImageTagss/>}></Route>
      <Route path='/DeleteItem' element={<DeleteItems/>}></Route>
  </Routes> 
);




export default withAuthenticator(App);
