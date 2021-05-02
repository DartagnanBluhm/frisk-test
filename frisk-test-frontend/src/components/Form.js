import React, { useState } from 'react'

export default function Form() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pin, setPin] = useState("")
    const [message, setMessage] = useState("")

    const SubmitForm = async e => {
        e.preventDefault()
        try {
            const content = { name, email, pin, message }
            const res = await fetch("http://localhost:5000/post", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(content)
            })
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form className="form-content" onSubmit={SubmitForm}>
            <label id="form-name-label">Name</label>
            <input type="text" id="form-name-input" onChange={e => setName(e.target.value)}></input>
            <label id="form-email-label">Email</label>
            <input type="text" id="form-email-input" onChange={e => setEmail(e.target.value)}></input>
            <label id="form-pin-label">Pin</label>
            <input type="number" id="form-pin-input" onChange={e => setPin(e.target.value)}></input>
            <label id="form-message-label">Message</label>
            <input type="text" id="form-message-input" onChange={e => setMessage(e.target.value)}></input>
            <input type="submit" className="btn"></input>
        </form>
    )
}
