import React from 'react'
import Modal from './Modal'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import {collection} from "firebase/firebase";
import {db} from "../config/firebase";
import {toast} from "react-toastify";
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required!"),
    email:Yup.string().email("Invalid Email").required("Email is required!"),
})

const AddUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) =>{
        try{
            const contactRef= collection(db,"contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact added successfully!");
        }catch(error){
            console.log(error);
        }
    };
    const updateContact = async (contact, id) =>{
        try{
            const contactRef= doc(db,"contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact updated successfully!");
        }catch(error){
            console.log(error);
        }
    };
  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
                validationSchema={contactSchemaValidation}
                initialValues={isUpdate ? {
                    name: contact.name,
                    email: contact.email,
                } :{
                    name: "",
                    email: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    isUpdate? updateContact(values, contact.id):
                    addContact(values);
                }}
            >
                <Form className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='name'>Name</label>
                        <Field name="name" className="h-10 border"/>
                        <div className='text-red-500 text-xs'>
                            <ErrorMessage name="name"/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Email</label>
                        <Field name="email" className="h-10 border"/>
                        <div className='text-red-500 text-xs'>
                            <ErrorMessage name="email"/>
                        </div>
                    </div>
                    <button className='bg-green px-2 py-1 border self-end'>{isUpdate? "Update": "Add"}</button>
                </Form>
            </Formik>
         </Modal>
    </div>
  )
}

export default AddUpdateContact