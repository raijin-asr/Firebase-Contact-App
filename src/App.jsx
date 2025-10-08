import Navbar from "./components/Navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import { useEffect, useState } from "react";
import {collection, getDocs, onSnapshot } from "firebase/firestore";
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddUpdateContact from "./components/AddUpdateContact";
import useDisclose from "./hooks/useDisclose";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NoContactFound";
 
const App = () => {

  const [contacts, setContacts]= useState([]);
  const [isOpen, onClose, onOpen]= useDisclose();

  useEffect(() => { 

    const getContacts= async () => {

      try{
        const contactsRef = collection(db, "contacts");

        //real time refresh
        onSnapshot(contactsRef, (snapshot) =>{
            const contactLists= snapshot.docs.map((doc)=>{
                      return {
                        id:doc.id,
                        ...doc.data(),
                      };
                    });

                    setContacts(contactLists);
                    return contactLists;
        }) 

      }catch(error){
        console.log(error);
      }
    }
    getContacts();

  },[])

  const searchFilter =(e) =>{
    const value= e.target.value;
    try{
        const contactsRef = collection(db, "contacts");

        //real time refresh
        onSnapshot(contactsRef, (snapshot) =>{
            const contactLists= snapshot.docs.map((doc)=>{
                      return {
                        id:doc.id,
                        ...doc.data(),
                      };
                    });
                    const filteredContacts = contactLists.filter(
                      (contact)=> contact.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setContacts(filteredContacts);

                    return filteredContacts;
        }) 

      }catch(error){
        console.log(error);
      }
  }
  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow">
          <FiSearch className="text-white text-2xl absolute ml-2"/>
          <input 
            onChange={searchFilter}
            type="text" 
            className="pl-9 text-white flex-grow border bg-transparent border-white rounded-md h-11"/>
        </div>
          <AiFillPlusCircle onClick={onOpen} className="text-5xl cursor-pointer text-white"/>
      </div>
      <div className="mt-4 gap-3 flex flex-col">
        {contacts.length <= 0 ? (
          <NoContactFound/>
        ): (
        contacts.map((contact)=>(
        <ContactCard key={contact.id} contact={contact} />
      ))
    )}
      </div>
    </div>
    <AddUpdateContact isOpen={isOpen} onClose={onClose}/>
    <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App  