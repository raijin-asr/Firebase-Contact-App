import React from 'react'
import Modal from './Modal'
import { Formik, Field, Form } from 'formik'
import {collection} from "firebase/firebase";
import {db} from "../config/firebase";

const AddUpdateContact = ({isOpen, onClose}) => {

    const addContact = async (contact) =>{
        try{
            const contactRef= collection(db,"contacts");
            await addDoc(contactRef, contact);
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    addContact(values);
                }}
            >
                <Form className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='name'>Name</label>
                        <Field name="name" className="h-10 border"/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Email</label>
                        <Field name="email" className="h-10 border"/>
                    </div>
                    <button className='bg-green px-2 py-1 border self-end'>Add</button>
                </Form>
            </Formik>
         </Modal>
    </div>
  )
}

export default AddUpdateContact