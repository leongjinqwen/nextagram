import React from 'react';
import Image from 'react-graceful-image';
import UserImages from '../containers/UserImages';



export default class UserProfilePage extends React.Component { 
    
    
    render() {
        let userId=this.props.match.params.id
        const {users} = this.props;
        const user = users.find((user) => (
            user.id == this.props.match.params.id))
         
        return (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-1"></div>
                        <div className="col-4 bg-light">
                            <div className='d-block text-center'>  
                                {user ? <Image src={user.profileImage} width="250" className="my-5 img-thumbnail rounded-circle img-fluid" />: null }
                            </div>
                        </div>
                        <div className="col-6 bg-light">
                            {user ? <h1 style={{fontFamily:'monospace'}} className='mt-5 text-align-left text-capitalize'>{user.username}</h1>: null }
                            {user ? <p className="text-muted mr-3">{user.bio}</p>: null }
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                            <div className='col-10 bg-light rounded'>
                                {user ? <h2 style={{fontFamily:'monospace'}} className='text-capitalize ml-5 mt-5'>{user.username}'s Photo</h2>: null }
                                <div><UserImages userId={userId} /></div>
                            </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </>
        )
      }

}