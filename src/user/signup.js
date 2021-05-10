import React from 'react';
import './signup.css';
import {signup} from "./auth";
import {Link} from 'react-router-dom';
const errorStyle={
    textAlign: "center"
}
class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
            error: ""
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
        const {firstname,lastname,email,password,phone,address,linkedin}=this.state;
        if(firstname.length===0)
        {
            this.setState({
                error: "Firstname is required"
            })
            return false;
        }

        if(lastname.length===0)
        {
            this.setState({
                error: "Laststname is required"
            })
            return false;
        }

        if(password.length>=0 && password.length<=5)
        {
            this.setState({
                error: "Password should contain atleast six characters"
            })
            return false;
        }

        if(email.length===0){
            this.setState({
                error: "Email is required"
            })
            return false
        }

        if(!/.+\@.+\..+/.test(email))
        {
            this.setState({
                error: "Please Enter a valid email"
            })
            return false;
        }

        if(phone.length===0)
        {
            this.setState({
                error: "phone is required"
            })
            return false;
        }

        if(!/^[6-9]\d{9}$/.test(phone))
        {
            this.setState({
                error: "valid phone no. is is required"
            })
            return false;
        }



        if(address.length===0)
        {
            this.setState({
                error: "address is required"
            })
            return false;
        }

        if(linkedin.length===0)
        {
            this.setState({
                error: "linkedIn link is required"
            })
            return false;
        }

        return true;
    }

    handleSubmit=event=>{
        event.preventDefault();
        if(this.isValid()){
        const {firstname,lastname,password,email,address,phone,linkedin}=this.state;

        const user={
            firstname,
            lastname,
            password,
            email,
            contacts:{address,
            phone,
            linkedin}
        }

        const register=async (user)=>{
            const data=await signup(user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    firstname:"",
                    lastname:"",
                    password:"",
                    email:"",
                    address:"",
                    linkedin:"",
                    phone:"",
                    error:""
                });
            }
        }
        register(user);
    }
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2>Sign Up</h2>
                            <form onSubmit={this.handleSubmit}> 
                                {this.state.error && 
                                <div className="alert alert-danger" style={errorStyle}>
                                    <i className='fas fa-exclamation-circle' style={{color:"red"}}></i> {this.state.error.toUpperCase()}
                                </div>
                                }
                                <div className="container">
                                <div className="row">
                                <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Firstname</b></label>
                                    <input type="text" className="form-control" placeholder="Enter Firstname" onChange={this.handleChange("firstname")} value={this.state.firstname}></input>
                                </div>
                                <div className="form-group">
                                    <label><b>Lastname</b></label>
                                    <input type="text" className="form-control" placeholder="Enter Lastname" onChange={this.handleChange("lastname")} value={this.state.lastname}></input>
                                </div>
                                <div className="form-group">
                                    <label><i class="fa fa-key" aria-hidden="true"></i></label>
                                    <input type="password" className="form-control" placeholder="Enter Password" onChange={this.handleChange("password")} value={this.state.password}></input>
                                </div>
                                <div className="form-group">
                                    <label><i class="fa fa-envelope" aria-hidden="true"></i></label>
                                    <input type="email" className="form-control" placeholder="Enter Email" onChange={this.handleChange("email")} value={this.state.email}></input>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                    <label><i class="fas fa-phone"></i></label>
                                    <input type="number" className="form-control" placeholder="Enter Phone Number" onChange={this.handleChange("phone")} value={this.state.phone}></input>
                                </div>
                                <div className="form-group">
                                    <label><i class="fas fa-map-marker-alt"></i></label>
                                    <input type="text" className="form-control" placeholder="Enter Address" onChange={this.handleChange("address")} value={this.state.address}></input>
                                </div>
                                <div className="form-group">
                                    <label><i className="fab fa-linkedin-in"></i></label>
                                    <input type="text" className="form-control" placeholder="Enter LinkedIn Profile" onChange={this.handleChange("linkedin")} value={this.state.linkedin} />
                                </div>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <button type="submit" className="btn btn-warning btn-block">Register</button>
                                        <p style={{fontSize: "14px",textAlign: "center"}}>Already have an account? <Link to="/signin">Log In</Link></p>
                                    </div>

                                </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;