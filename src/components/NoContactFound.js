import React from 'react'

const NotFoundContact = () => {
  return (
    <div className='flex h-[80vh] items-center justify-center gap-4'>
        <img src='/contact.png'/>
        <h3 className='text-2xl font-semibold text-white'>Contact not found!</h3>
    </div>
  )
}

export default NotFoundContact