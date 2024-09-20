  import React, { useEffect, useState } from 'react'
  import { Link, useNavigate, useParams } from 'react-router-dom'
  import { ContactServices } from '../../Services/ContactServices';

  const EditContact = () => {

    let navigate = useNavigate();
    let {contactid} = useParams();

    let [state,setState] = useState({
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

    useEffect(()=>{
      new Promise((res, rej)=>{
        setState({...state,loading:true})
        let response = ContactServices.getContact(contactid);
        res(response);
      }).then((resp)=>{
        setState({...state, loading:false, contact:resp.data})
      }).catch(()=>{
        setState({errorMessage:alert("data not found!!")});
      })
    },[contactid])

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
            setState({...state, loding:true})
            let postData=ContactServices.updateContact(contact,contactid);
            res(postData)
            }).then((resp)=>{
              if(resp){
                setState({...state,loading:false})
                navigate("/contacts/list",{replace:true})
              }else{
                setState({...state,loading:false})
                navigate("/contacts/edit",{replace:false})
              }
            }).catch(()=>{
              setState({...state,loading:false,errorMessage:alert("data is not found!!")});
            })
        }

    let {loading, contact, errorMessage} = state;

    return (
      <>
      {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      {/* <h1>{contactid}</h1> */}
      <section className="edit-contact">
        <div className='container p-3'>
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Edit Contact</p>
              <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, veritatis praesentium fugiat neque velit porro. Commodi alias itaque consectetur, sapiente ab ratione, facilis, et ipsum nemo ex hic consequatur reiciendis!</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitHandle}>
                <div className="mb-2">
                  <input type="text" name='name' placeholder='Name' value={contact.name} onChange={updateHandle} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='photo' placeholder='Photo Url' value={contact.photo} onChange={updateHandle} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="number" name='mobile' placeholder='Mobile' value={contact.mobile} onChange={updateHandle} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="email" name='email' placeholder='Email' value={contact.email} onChange={updateHandle} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='company' placeholder='Company Name' value={contact.company} onChange={updateHandle} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='title' placeholder='Title' value={contact.title} onChange={updateHandle} className='form-control' />
                </div>
                <div  className="mb-2">
                  <input type="submit" value="Update" className='btn btn-success' />
                  <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
            <div className='col-md-6'>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </section>
      </>
    )

  }

  export default EditContact
