import React from 'react'
import Form from '../components/Form'

export default function Home() {
    return (
        <div className="body-content">
            <h1>Please enter some details below, they will be saved and can be viewable on the <a href="/list">here.</a></h1>
            <Form />
        </div>
    )
}
