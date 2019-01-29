import React from 'react';
import axios from 'axios';
import Image from 'react-graceful-image';
import { Redirect } from 'react-router-dom'
export default class MyProfilePage extends React.Component {
    state = {
        myImages : [],
        isLoading :true,
    }
    componentDidMount() {
        
        axios({
            method: 'get',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.me).auth_token}`
            }
        })
        .then(response => {
            // debugger
            const myImages = response.data;
            this.setState({
                myImages,
                isLoading : false,
            });
        })
        .catch(error => {
            // debugger
            console.log('ERROR: ', error)
        })
    }

    render (){
        if (!localStorage.getItem('me')) {
            return <Redirect to="/" />
        }
        const username = JSON.parse(localStorage.me).user.username
        const profileImage = JSON.parse(localStorage.me).user.profile_picture
        const {myImages} = this.state
        return(
            <>
               <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-1"></div>
                        <div className="col-4 bg-light">
                            <div className='d-block text-center'>  
                                <Image src={`http://next-curriculum-instagram.s3.amazonaws.com/${profileImage}`} width="250" className="my-5 img-thumbnail rounded-circle img-fluid" />
                            </div>
                        </div>
                        <div className="col-6 bg-light">
                            <h1 style={{fontFamily:'monospace'}} className='mt-5 text-align-left text-capitalize'>{username}</h1>
                            <p className="text-muted mr-3">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                            <div className='col-10 bg-light rounded'>
                                <h2 style={{fontFamily:'monospace'}} className='text-capitalize ml-5 mt-5'>{username}'s Photo</h2>
                                <ul>
                                    {
                                    myImages.map((myImage, index) =>(
                                        <div className='d-inline image-fluid' key={index}>
                                            <Image src={myImage} style={{objectFit:'cover'}} width="293" height="293" className='m-2 rounded image-fluid'/>
                                        </div>
                                    )
                                    )
                                    }
                                </ul>
                            </div>
                        <div className="col-1"></div>
                    </div>
                </div>
                
               
            </>
        )
    }
}