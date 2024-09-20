import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../Services/ContactServices";
import Spinner from "./Spinner";

const ViewContact = () => {

  let {contactid} = useParams();
  let [state,setState] = useState({
    loading:true,
    contact:{},
    errorMessage:""
  }) 

  useEffect(()=>{
    new Promise((res,rej)=>{
      setState({...state, loading:true, contact:{}});
      let response = ContactServices.getContact(contactid);
      res(response);
    }).then((resp)=>{
      setState({...state, loading:false, contact:resp.data})
    }).catch(()=>{
      setState({...state, loading:false, errorMessage:alert('data not found')})
    })
  },[contactid]);

  console.log(state.contact);

  let {loading,contact,errorMessage} = state;
  return (
    <>
    <h2>{contactid}</h2>
      <section className="view-contact-intro">
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
                nemo culpa voluptates amet atque numquam cum, quae eius impedit
                ut minima ratione, adipisci consequatur repellendus beatae
                eveniet vero animi deleniti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading?<Spinner/>:<React.Fragment>
{
  Object.keys(contact).length>0 &&
        <section className="view-contact-list">


        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-2 my-2">
              <img
                className="profile-pic"
                src={contact.photo}
                alt=""
              />
            </div>
          </div>
          <div className="row justify-content-center my-2">
            <div className="col-md-10">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  Name : <span className="fw-bold">{contact.name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Email : <span className="fw-bold">{contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Contact : <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Company Name : <span className="fw-bold">TCS</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Title : <span className="fw-bold">Developer</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Company Group : <span className="fw-bold">Family</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <Link to={"/"} className="btn btn-warning">
              Back
            </Link>
          </div>
        </div>
      </section>
}
        
        </React.Fragment>}



      
    </>
  );
};

export default ViewContact;
