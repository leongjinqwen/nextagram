import React from 'react';
import UserImages from '../containers/UserImages';
import Image from 'react-graceful-image';
import { Link } from 'react-router-dom';



export default class HomePage extends React.Component {   
    
    render() {
        const {users} = this.props;
        return (
        <div>
            <div className='container-fluid'>
                <div className='mx-5'>
                    {
                    users.map((users, index) =>(
                        <div key={index} className='bg-light shadow-sm mb-5 p-3 rounded row'>
                            <div className="col-3">
                                <Link to={`/users/${users.id}`} >
                                    
                                    <Image src={users.profileImage} className="w-100 rounded-circle img-thumbnail img-fluid" alt={users.username}/>  
                                </Link>
                                <h4 style={{fontFamily:'monospace'}} className="text-capitalize text-dark">{users.username}</h4>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="col-9">
                                <UserImages userId={users.id} />
                            </div>               
                        </div>
                    )
                    )
                    }
                </div>
            </div>
             
        </div>
        )
    }

}
