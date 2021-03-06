import React, { useState } from 'react'

export default function Form() {

    // STATES
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pin, setPin] = useState("")
    const [message, setMessage] = useState("")

    //Submits a request to insert a post to the database via the api.
    const SubmitForm = async e => {
        e.preventDefault()
        try {
            const content = { name, email, pin, message }
            await fetch("http://localhost:5000/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content)
            })
            document.getElementById("home-form").reset()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="form-content">
            <form id="home-form" onSubmit={SubmitForm}>
                <div className="form-name-content">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" id="form-name-input" maxLength="48" required="required" pattern="[A-Za-z\s]+" title="Only supports the english alphabet" onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="form-email-content">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-input" id="form-email-input" maxLength="48" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="form-pin-content">
                    <label className="form-label">Pin</label>
                    <input type="number" className="form-input" id="form-pin-input" max="9999" required="required" onChange={e => setPin(e.target.value)}></input>
                </div>
                <div className="form-message-content">
                    <label className="form-label">Message</label>
                    <input type="text" className="form-input" id="form-message-input" maxLength="48" required="required" onChange={e => setMessage(e.target.value)}></input>
                </div>
                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}
