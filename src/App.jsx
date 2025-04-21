import Navbar from "./components/Navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import { useEffect, useState } from "react";
import {collection, getDocs } from "firebase/firestore";
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";

 
const App = () => {

  const [contacts, setContacts]= useState([]);

  useEffect(() => { 

    const getContacts= async () => {

      try{
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists= contactsSnapshot.docs.map((doc)=>{
          return {
            id:doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      }catch(error){
        console.log(error);
      }
    }
    getContacts();

  },[])
  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow">
          <FiSearch className="text-white text-3xl absolute ml-1"/>
          <input type="text" className="pl-9 text-white flex-grow border bg-transparent border-white rounded-md h-10"/>
        </div>
          <AiFillPlusCircle className="text-5xl cursor-pointer text-white"/>
      </div>
      <div className="mt-4 gap-3 flex-col">{
        contacts.map((contact)=>(
        <ContactCard key={contact.id} contact={contact} />
      ))}
      </div>
    </div>
  )
}

export default App 