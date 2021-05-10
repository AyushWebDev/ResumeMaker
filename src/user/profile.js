import React from 'react';
import defaultImage from '../image/avatar.png';
import { getBasics,isAuthenticated } from './auth';

class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
            error: ""
        }
    }

    componentDidMount(){
        const getBasicsDetails=async (id)=>{
            const data=await getBasics(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    address: data.contacts.address,
                    phone: data.contacts.phone,
                    linkedin: data.contacts.linkedin,
                    error: ""
                })
            }
        }
        const id=isAuthenticated().user._id;
        getBasicsDetails(id);
    }

    render(){
        return(
            <div>
                <div className="container"> 
                    <div className="row">
                        <div className="col-md-4">
                        <div className="card" style={{width: "18rem"}}>
                            <img className="card-img-top" src={defaultImage} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.firstname} {this.state.lastname}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                            <div>
                                <p><i className="fa fa-envelope" aria-hidden="true"></i> {this.state.email}</p>
                                <p><i className="fas fa-phone"></i> {this.state.phone}</p>
                                <p><i className="fas fa-map-marker-alt"></i> {this.state.address}</p>
                                <p><i className="fab fa-linkedin-in"></i> {this.state.linkedin}</p>
                            </div>
                        </div>
                            
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;