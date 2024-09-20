import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList';
import AddContact from './Components/Contacts/AddContact';
import EditContact from './Components/Contacts/EditContact';
import ViewContact from './Components/Contacts/ViewContact';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Navigate to={'/contacts/list'}/>}/>
      <Route path='/contacts/list' element={<ContactList/>}/>
      <Route path='/contacts/add' element={<AddContact/>}/>
      <Route path='/contacts/edit/:contactid' element={<EditContact/>}/>
      <Route path='/contacts/view/:contactid' element={<ViewContact/>}/>
    </Routes>
    </>
  );
}

export default App;
