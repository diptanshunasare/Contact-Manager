import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices';


const AddContact = () => {

  let navigate = useNavigate();

  let [state, setState] = useState({
    loading:true,
    contact:{
      name:"",
      photo:"",
      mobile:"",
      email:"",
      title:"",
      company:"",
      groupId:""
    },
    errorMessage:""
  })

  const updateHandle=(event)=>{
    setState({...state, 
        contact:{
      ...state.contact,
      [event.target.name]:event.target.value,
    }})
    
    
  }

  let submitHandle =(event)=>{
    event.preventDefault();
    new Promise((res,rej)=>{
      setState({...state, loading:true})
      let postData=ContactServices.createContact(contact);
      res(postData)
      }).then((resp)=>{
        if(resp){
          setState({...state,loading:false})
          navigate("/contacts/list",{replace:true})
        }else{
          setState({...state,loading:false})
          navigate("/contacts/add",{replace:false})
        }
      }).catch(()=>{
        setState({...state,loading:false,errorMessage:alert("data is not found!!")});
      })
  }


  let {loading, contact, errorMessage} = state;
  
  return (
    <>
    <h1>{contact.id}</h1>
    <pre>{JSON.stringify(contact)}</pre>
     <section className="add-contact">
      <div className='container p-3'>
        <div className="row">
          <div className="col">
            <p className="h3 text-success fw-bold">Create Contact</p>
            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, veritatis praesentium fugiat neque velit porro. Commodi alias itaque consectetur, sapiente ab ratione, facilis, et ipsum nemo ex hic consequatur reiciendis!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form action="" onSubmit={submitHandle}>
              <div className="mb-2">
                <input type="text" name="name" required={true} value={contact.name} placeholder='Name' onChange={updateHandle} className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" name='photo' required={true} value={contact.photo} placeholder='Photo Url' onChange={updateHandle} className='form-control' />
              </div>
              <div className="mb-2">
                <input type="number" name='mobile' required={true} value={contact.mobile} placeholder='Mobile' onChange={updateHandle} className='form-control' />
              </div>
              <div className="mb-2">
                <input type="email" name='email' required={true} value={contact.email} placeholder='Email' onChange={updateHandle} className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" name='company' required={true} value={contact.company} placeholder='Company Name' onChange={updateHandle} className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" name='title' required={true} value={contact.title} placeholder='Title' onChange={updateHandle} className='form-control' />
              </div>
               <div  className="mb-2">
                <input type="submit" value="Create" className='btn btn-success' />
                <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
               </div>
            </form>
          </div>
        </div>
      </div>
    </section> 
    </>
  )
}

export default AddContact
