import React from 'react';
import mainLogo from './nextagramlogo.png';
import userLogo from './profileicon.png';
import notiLogo from './notilogo.png';
import { Link } from 'react-router-dom';
import ShowModal from '../containers/ShowModal';


export default class Navbar extends React.Component {
    state = {
        showModal: false
      }

    toggle=()=> {
      this.setState({
        showModal: !this.state.showModal
      });
    }

    handleLogout = () => {
        localStorage.removeItem('me')
        this.forceUpdate()
    }

    render(){
       return(
            <>
                {this.state.showModal ? <ShowModal showModal={this.state.showModal} toggle={this.toggle} /> : null}
                <nav className="navbar fixed-top shadow-sm p-1 mb-5 bg-white rounded">
                    <Link to="/" className="navbar-brand text-dark pl-4 font-weight-bolder">
                        <img src={mainLogo} width="35" height="35" className="d-inline-block align-top pr-1" alt="Nextagram" />
                        Nextagram
                    </Link>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="nav justify-content-end font-weight-bold">
                        { localStorage.getItem('me') ? 
                        <>
                            <li className="nav-item">
                                <a className="nav-link active text-dark" href="#">
                                    <img src={notiLogo} width="30" height="30" className="d-inline-block align-top pr-1" alt="notification" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/me" className="nav-link text-dark">
                                    <img src={userLogo} width="30" height="30" className="d-inline-block align-top pr-1" alt="myprofile" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark" onClick={this.handleLogout}>Logout</Link> 
                            </li>
                        </>
                        : 
                        <>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark" onClick={this.toggle}>Login</Link>
                            </li>
                        </>}
                    </ul>
                </nav>
            </>
        )
    }
        
}