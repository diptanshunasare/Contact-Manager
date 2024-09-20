import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../../Services/ContactServices";
import Spinner from "./Spinner";

const ContactList = () => {

    const[query, setQuery] = useState({
      text:"",
    })

  const [state, setState] = useState({
    loading: true,
    contacts: [],
    filteredContact:[],
    errorMessage: "",
  });

  useEffect(() => {
    new Promise((res, rej) => {
      setState({ ...state, loading: true, contacts: [] });
      let response = ContactServices.getAllContacts();
      res(response);
    })
      .then((resp) => {
        setState({
          ...state,
          loading: false,
          contacts: resp.data,
          filteredContact:resp.data
        });
      })
      .catch(() => {
        setState({
          ...state,
          loading: false,
          errorMessage: alert("Data not found!!"),
        });
      });
  }, []);

  let clickDelete=(contactid)=>{
    new Promise((res,rej)=>{
      let deleteContact = ContactServices.deleteContact(contactid);
      res(deleteContact);

    }).then((res1)=>{
    if(res1){
      new Promise((res, rej) => {
        setState({ ...state, loading: true, contacts: [] });
        let response = ContactServices.getAllContacts();
        res(response);
      })
        .then((resp) => {
          setState({
            ...state,
            loading: false,
            contacts: resp.data,
            filteredContact:resp.data
          });
        })
        .catch(() => {
          setState({
            ...state,
            loading: false,
            errorMessage: alert("Data not found!!"),
          });
        });
    }
    }).catch()
  }


  //search query
  let searchContact=(event)=>{
    setQuery({...query, text:event.target.value})

    let theContacts = state.contacts.filter((contact)=>{

      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())

    })

    console.log(theContacts);

    setState({...state, filteredContact:theContacts})
  }


  let { loading, contacts, errorMessage, filteredContact } = state;
  console.log(contacts);
  return (

    <>
      <section className="contact-serch">
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager{" "}
                  <Link to={"/contacts/add"} className="btn btn-primary">
                    <i className="fa fa-plus-circle"></i> New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Asperiores corrupti reiciendis perspiciatis, sunt rem
                  consectetur deserunt nostrum atque nihil eveniet commodi aut
                  cumque. Ipsa iste, repellendus tempore cum ab iusto!
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <form action="" className="row">
                      <div className="col">
                        <div className="mb-2">
                          <input type="text" name="text" onChange={searchContact} value={query.text} placeholder="Search Name" className="form-control"/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-2">
                          <input type="submit" value="Search" className="btn btn-outline-dark"/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (<Spinner />) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container" >
              <div className="row">
                {filteredContact.length > 0 && filteredContact.map((contact) => {
                    return (
                      <div className="col-md-6 mb-4" key={contact.id}>
                        <div className="card d-flex justify-content-sm-center">
                          <div className="card-body ">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  className="profile-pic"
                                  alt=""
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    {contact.name}
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    {contact.mobile}
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    {contact.email}
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex-column align-items-center" >
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger my-1" onClick={()=>{clickDelete(contact.id)}}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </>
  );
};

export default ContactList;
