// export const signup=(user)=>{
    
//     return(
//      fetch(`http://localhost:8000/user/`,{ 
//          method: "POST", 
//          headers: {
//              Accept: "application/json",
//              "Content-Type": "application/json" 
//          },
//          body: JSON.stringify(user)
//      }
//      )
//      .then(response=>{
//          return response.json();
//      })
//      .catch(err=>console.log(err))  
//     );
        
    
//  }; 

 export const signup=async (user)=>{
    try{
     const response=await fetch(`http://localhost:8000/user/`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    });
    console.log("response: ",response);
    return response.json();
    }catch(e){
        console.log(e);
    }
 }

 export const signin=async (user)=>{
    try{
     const response=await fetch(`http://localhost:8000/user/signin`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    });
    console.log("response: ",response);
    return response.json();
    }catch(e){
        console.log(e);
    }
 }

 export const signout=(next)=>{
    if(typeof window !== "undefined")
        localStorage.removeItem("jwt");
    next();
    return (
        fetch(`http://localhost:8080/signout`,{
            method: "GET"
        })
        .then(response=>{
            response.json();
        })
        .catch(error=>{
            console.log(error);
        })
    ); 
};

export const getBasics=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/user/getBasics/${id}`,{ 
            method: "GET", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            }
        });
        return response.json();
    }catch(e){
        console.log(e);
    }
}

export const isAuthenticated=()=>{
    if(typeof window !==undefined)
    {
        if(localStorage.getItem("jwt"))
            return JSON.parse(localStorage.getItem("jwt"));
        else 
            return false;
    }
    return false;
};

//export default signup;

