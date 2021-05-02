import React, { useState, useEffect } from 'react'

export default function List() {

    const [posts, addPosts] = useState([])

    useEffect(() => {
        pullPosts()
    }, [])

    const pullPosts = async () => {
        try {
            const res = await fetch("http://localhost:5000/all")
            const tableData = await res.json()
            addPosts(tableData)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="body-content">
            <h1>List of Database Entries</h1>
            <table className="table-content">
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Message</th>
                    <th>Delete</th>
                </tr>
                {posts.map(post => (
                    <tr key={post.post_id}>
                        <td>{post.post_creation}</td>
                        <td>{post.post_name}</td>
                        <td><button className="btn">Reveal</button></td>
                        <td><button className="btn">Delete</button></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
