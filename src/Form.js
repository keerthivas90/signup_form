import React, { useReducer } from 'react';
import './App.css' 
import data from './Data/users.json';
import apiRequest from './apiRequest';
const initialstate = {    
name:"",
email:"",
phone:"" ,
password:""
}
  
const reducer =(state ,action)=>{
    switch(action.type){
        case "changeFieldValue":
            return{
                ...state,
                [action.field]:action.payload   
            }
            case "submit":
             
              const id =  data.users.length >= 1 ? data.users.length + 1: 1 ;
            
              const APIWorkerS_URL="http://localhost:8080/users"
              const postWorkers = {
                method: "POST",
                headers: {
                  'Content-type':'application/json'
                },
                body: JSON.stringify({"id":id,"name":state.name,"email":state.email,"phone":state.phone}) 
              }
              const WorkersResult = apiRequest(APIWorkerS_URL,postWorkers)
              console.log(WorkersResult)
              return{
                  state:alert(state.name + 'form cubmitted')
                   
                }
                          
                
        case "reset":
            return{
               state:initialstate
                }
        default :
        return initialstate;
    }
}

const Form = () => {
    const [state,dispatch]=useReducer(reducer,initialstate);
   
    const changeFieldValue = (field)=>(event)=>{
        dispatch({ type:"changeFieldValue",field,payload:event.target.value})
    }
     
    const FormSubmit =  (e)=>{
        e.preventDefault();
       dispatch({ type:"submit",payload:e.target.value})
     alert(state.name+ ' Your Details Addes Succesfully '  ) ;
        
          dispatch("reset");
      
    }
   
   
  return (
    <div className='main-content'>
        <h1> Forms  </h1>   
      
       
        <div>
 
           <form onSubmit={FormSubmit}  >
            <label> Name </label>
            <input type="text"  placeholder="Name" value={state.name}  title="Name" name='name' onChange={changeFieldValue('name')}  required />
            <label> Email </label>
            <input type="email"  placeholder="name@mail.com"  value={state.email} title="Email ID"  name='email' onChange={changeFieldValue('email')} required />
            <label> Phone </label>
            <input type="tel" name="phone" placeholder="888 888 8888"  value={state.phone}  maxLength="10"  title="Ten digits code"  onChange={changeFieldValue('phone')} required/>  
            <label> Password </label>
            <input type="password"  name="password"  value={state.password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="password" onChange={changeFieldValue('password')}  required />
            <button type='submit'> Submit </button>            
        </form>
        <button onClick={()=>dispatch("reset")} > Reset </button>
    
        <h2> Register Users </h2>
        {data.users.map((item)=><li key={item.id}> {item.name}</li>)}
        </div>
     
        
        
    </div>
  )
}

export default Form