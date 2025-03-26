import React, { useState } from 'react'

const ContactForm = ({}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/create_account"
    }


  return (
    <form onSubmit={onSubmit}>
        {/* First Name */}
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            />
        </div>
        {/* Last Name */}
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input 
                type="text" 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
            />
        </div>
        {/* Email */}
        <div>
            <label htmlFor="email">Email:</label>
            <input 
                type="text" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <button type='submit'>Create Contact</button>
    </form>
  )
}

export default ContactForm