import axios from "axios";
export class ContactServices {
  static serverURL = "http://localhost:8000";
  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.get(dataURL);
  }

  static getContact(contactId){
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  static createContact(contact){
    let dataURL = `${this.serverURL}/contacts`
    return axios.post(dataURL,contact);
  }

  static updateContact(contact,contactid){
    let dataURL = `${this.serverURL}/contacts/${contactid}`
    return axios.put(dataURL,contact);
  }

  static deleteContact(contactid){
    let dataURL = `${this.serverURL}/contacts/${contactid}`;
    return axios.delete(dataURL);
  }
}
