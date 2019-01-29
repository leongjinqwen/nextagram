import React from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import LoadIndicator from './components/LoadIndicator';
import Router from './Router';
// import MyProfilePage from './pages/MyProfilePage';


class App extends React.Component {
  state = {
    users : [],
    isLoading : true,
  }

  refreshApp = () => {
    this.forceUpdate()
  }

  componentDidMount() {


    axios({
        method: 'get',
        url: 'https://insta.nextacademy.com/api/v1/users',
    })
    // performing a GET request to '/api-end-point'
    .then(result => {
        // If successful, we do stuffs with 'result'
        const users = result.data;
        this.setState({
          users : users,
          isLoading : false,
        });
    })
    .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
    })
    }

  render(){
    const {users,myImages,isLoading} = this.state;
    return (
      <div className='mt-5'>
        <Navbar refreshApp={this.refreshApp} />
        <Router myImages={myImages} users={users} isLoading={isLoading} />       
        <LoadIndicator isLoading={isLoading} />
        {/* <MyProfilePage images={images} isLoading={isLoading} /> */}
        
      </div>
    )
  }
}

export default App;
