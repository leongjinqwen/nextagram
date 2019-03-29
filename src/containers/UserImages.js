import React from 'react';
import axios from 'axios';
import Image from 'react-graceful-image';


export default class UserImages extends React.Component {
    state = {
        images : [],
        isLoading :true,
    }
    
    
    componentDidMount() {
        const {userId} = this.props;
        axios({
            method: 'get',
            url: `https://insta-nextagram.herokuapp.com/api/v1/images/${userId}`,
        })
        .then(result => {
            const images = result.data;
            this.setState({
                images : images,
                isLoading : false,
            });
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    }

    render() {
        const {images} = this.state
        
        return (
            <div>
                <ul>
                    {
                    images.map((userImage, index) =>(
                        <div className='d-inline image-fluid' key={index}>
                            <Image src={userImage} style={{objectFit:'cover'}} width="293" height="293" className='m-2 rounded image-fluid'/>
                        </div>
                    )
                    )
                    }
                </ul>
            
            </div>
        )
    }

}
