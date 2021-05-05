import React, { useState, useEffect } from 'react'
import useModal from 'react-hooks-use-modal'

export default function Table() {

    const [postid, setPostid] = useState("")
    const [pinNotifVisible, setPinNotifVisible] = useState(false)
    const [pin, setPin] = useState("")
    const [posts, setPosts] = useState([])
    const [Modal, open, close] = useModal('root', {
        preventScroll: true
    })

    useEffect(() => {
        pullPosts()
    }, [])

    const pullPosts = async () => {
        try {
            const res = await fetch("http://localhost:5000/all")
            setPosts(await res.json())
        } catch (error) {
            console.log(error.message)
        }
    }

    const verifyPin = async e => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:5000/auth", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ post_id: postid, post_pin: pin })
            })
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                console.log(posts)
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].post_id === postid) {
                        posts[i].post_message = data.post_message
                        break;
                    }
                }
                console.log(posts)
                close()
            } else {
                setPinNotifVisible(true)
            }
            setPin("")
        } catch (error) {
            console.log(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            console.log(await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" }))
            setPosts(posts.filter(p => p.post_id !== id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const savePostID = (post_id, showMessage) => {
        try {
            setPinNotifVisible(false)
            setPostid(post_id)
            
            open()
        } catch (error) {
            console.log(error.message)
        }
    }

    const exitModal = () => {
        setPinNotifVisible(false)
        close()
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
                            <td>{post.post_message !== "" ? post.post_message : <button className="btn" onClick={() => savePostID(post.post_id)}>Reveal</button>}</td>
                            <td><button className="btn" onClick={() => deletePost(post.post_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal visible={false} width="800" height="400" effect="fadeInDown">
                <div className="popup-content">
                    <h3>Please enter a pin</h3>
                    {pinNotifVisible ? <div className="popup-pin-notif"><p>Invalid Pin</p></div> : null}
                    <form onSubmit={verifyPin}>
                        <input type="number" id="list-pin-input" onChange={e => setPin(e.target.value)}></input>
                        <div className="popup-buttons">
                            <input type="submit" value="Submit" className="btn popup-btn"></input>
                            <button className="btn popup-btn" onClick={exitModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
