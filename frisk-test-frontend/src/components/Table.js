import React, { useState, useEffect } from 'react'
import useModal from 'react-hooks-use-modal'
import PinInput from 'react-code-input'

export default function Table() {

    const [postid, setPostid] = useState("")
    const [pin, setPin] = useState("")
    const [posts, addPosts] = useState([])
    const [Modal, open, close] = useModal('root', {
        preventScroll: true
    })

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

    //need to out how to get the value from the pin input, check it, then turn it as isvalid false
    const verifyPin = async e => {
        try {
            const res = await fetch("http://localhost:5000/auth", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({post_id: postid})
            })
            console.log(await res.json())
            close()
        } catch (error) {
            console.log(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            console.log(fetch(`http://localhost:5000/delete/${id}`, {method: "DELETE"}))
            addPosts(posts.filter(p => p.post_id !== id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const savePostID = (post_id) => {
        try {
            setPostid(post_id)
            open()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="table-content">
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.post_id}>
                            <td>{post.post_creation}</td>
                            <td>{post.post_name}</td>
                            <td><button className="btn" onClick={() => savePostID(post.post_id)}>Reveal</button></td>
                            <td><button className="btn" onClick={() => deletePost(post.post_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal visible={false} width="800" height="400" effect="fadeInDown" onClickAway={close}>
                <div className="popup-content">
                    <form onSubmit={verifyPin}>
                        <PinInput id="pin-input" type="tel" fields={4} onChange={e => setPin(e.target.value)}/>
                        <input type="submit" value="Submit" className="btn"></input>
                        <button onClick={close}>Cancel</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
