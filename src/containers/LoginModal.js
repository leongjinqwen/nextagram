import React from 'react';
import { Button, UncontrolledAlert, FormGroup, FormText, Input, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import axios from 'axios';

export default class LoginModal extends React.Component {
    state = {
        email: '',
        password: '',
        emailValid: false,
        passwordValid: false,
        formValid: false,
        hasErrors: false,
        errors: [],
        isLogin: false,
        success: []
      }
    
    handleChange=(event)=> {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => {this.validateField(name,value)});
    }
    
    handleSubmit=(event)=> {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'https://insta-nextagram.herokuapp.com/api/v1/login',
            data: { 
                email : this.state.email,
                password: this.state.password
            }, 
        })
        .then(response => {
            // debugger
            console.log(response);
            localStorage.setItem('me', JSON.stringify(response.data));
            setTimeout(this.props.toggle,1000);
            this.setState({
                isLogin : true,
                success : response.data.message,
            })
            
        })
        .catch(error => {
            // debugger
            console.log(error)
            this.setState({
                hasErrors : true,
                errors : error.response.data.message,
            })
        })
    }

    validateField(fieldName,value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            break;
            case 'password':
            passwordValid = value.length >= 8;
            break;
            default:
            break;
        }
        this.setState({ emailValid: emailValid,
                        passwordValid: passwordValid
                        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

      
  render() {
    const {formValid,isLogin,success,hasErrors,errors} = this.state
    const {toggle, signup, showModal} = this.props
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <>
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Nextagram</ModalHeader>
                { isLogin && <UncontrolledAlert color="info">{success}</UncontrolledAlert> }                
                <ModalBody>
                    <FormGroup>
                        { hasErrors && <UncontrolledAlert color="danger">{errors}</UncontrolledAlert>}
                        <Input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        <FormText color="muted"><a href="#">Forget your password?</a></FormText>
                    </FormGroup>
                    
                    <Button color="primary" block disabled={!formValid} onClick={this.handleSubmit} >Login</Button>
                </ModalBody>
                <ModalFooter>
                    <Label for="account">New user? Sign up now!</Label>
                    <Button color="secondary" onClick={signup}>Sign up</Button>
                </ModalFooter>
            </Modal>
           
        </>
    );
  }
}

 