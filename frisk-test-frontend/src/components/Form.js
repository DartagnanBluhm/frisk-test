import React, { useState } from 'react'

export default function Form() {

    //states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pin, setPin] = useState("")
    const [message, setMessage] = useState("")

    //Submits a post to the api for storage in the database
    const SubmitForm = async e => {
        e.preventDefault()
        try {
            const content = { name, email, pin, message }
            const res = await fetch("http://localhost:5000/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content)
            })
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="form-content">
            <form onSubmit={SubmitForm}>
                <div className="form-name-content">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" id="form-name-input" onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="form-email-content">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-input" id="form-email-input" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="form-pin-content">
                    <label className="form-label">Pin</label>
                    <input type="number" className="form-input" id="form-pin-input" onChange={e => setPin(e.target.value)}></input>
                </div>
                <div className="form-message-content">
                    <label className="form-label">Message</label>
                    <input type="text" className="form-input" id="form-message-input" onChange={e => setMessage(e.target.value)}></input>
                </div>
                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}
