import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import AddUpdateContact from './AddUpdateContact';
import {toast} from "react-toastify";

const ContactCard = ({contact}) => {
  const [isOpen, onClose, onOpen]= useDisclose();

  const deleteContact = async (contact) =>{
          try{
              await deleteDoc(doc(db, "contacts",id));
              toast.success("Contact deleted successfully!");
          }catch(error){
              console.log(error);
          }
      }
  return (
    <>
      <div key={contact.id} 
      className="flex justify-between p-2 rounded-lg items-center bg-green hover:bg-white transition duration-200 ease-in-out cursor-pointer">
          <div className="flex gap-1"> 
            <HiOutlineUserCircle className="text-orange-400 text-4xl"/>
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
          </div>
            <div className="flex text-3xl">
              <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
              <IoMdTrash className="text-orange cursor-pointer"  
              onClick={() => deleteContact(contact.id)}/>
            </div>
          </div>
          <AddUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
          )
};

export default ContactCard