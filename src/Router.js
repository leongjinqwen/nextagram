import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';


   
export default class Router extends React.Component {
    render(){
        const {toggle,users,images,isLoading}=this.props;
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={props=><HomePage users={users} isLoading={isLoading}{...props} />} />
                    <Route path="/users/:id" component={props=><UserProfilePage users={users} userId={users.id} {...props} />} />
                    <Route path="/me" component={props=><MyProfilePage toggle={toggle} users={users} images={images} isLoading={isLoading} {...props} />} />
                </Switch>
            </div>
        )
    }
}
        

    

