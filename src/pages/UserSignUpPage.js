import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/input";
class UserSignUpPage extends React.Component{

    state = {//Comes from React.components
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors:{

        }
    };
  

    onChange = event => {
        const { name, value} = event.target
        const errors = { ...this.state.errors};
        errors[name] = undefined;

        if (name === "password" || name === "passwordRepeat") 
            if (name === "password" && value !==  this.state.passwordRepeat)
                errors.passwordRepeat = 'Password mismatch'
            else if (name === "passwordRepeat" && value != this.state.password)
                errors.passwordRepeat = "Password mismatch";
            else
                errors.passwordRepeat = undefined;
        
        this.setState({
            [name]: value,
            errors
        })
    }
    
    onClickSignUp = async event =>{
        event.preventDefault();//We block browser

        const { username, displayName, password} = this.state;

        const body = {
            username,
            displayName,
            password,
        };

        this.setState({pendingApiCall: true});
        
        try{
            const response = await signup(body);
        }catch (error){
            if (error.response.data.validationErrors)// we dont want to set errors to null
                this.setState({errors: error.response.data.validationErrors});
        }
        this.setState({pendingApiCall: false});
    }

    render(){
        const { pendingApiCall, errors } = this.state;// we dont want to use this.state.pendingApiCall everytime
        const { username, displayName, password, passwordRepeat} = errors;
        return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange}/>
                <Input name="password" label="Password" error={password} onChange={this.onChange} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password"/>
                <div className="spacer5"></div>
                <div className="text-center">
                    <button className="btn btn-secondary" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined}>
                    {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up 
                    </button>
                </div>
            </form>
        </div>
        );
    }
}

export default UserSignUpPage;