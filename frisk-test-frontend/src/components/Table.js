import React, { useState, useEffect } from 'react'
import useModal from 'react-hooks-use-modal'
import { CSVDownload } from 'react-csv'

export default function Table() {

    // STATES
    const [postid, setPostid] = useState("")
    const [pinNotifVisible, setPinNotifVisible] = useState(false)
    const [exportCSV, setExportCSV] = useState(false)
    const [pin, setPin] = useState("")
    const [posts, setPosts] = useState([])
    const [csvData, setCSVData] = useState([])
    const [Modal, open, close] = useModal('root', {
        preventScroll: true
    })

    //Periodically refreshes the tables by calling pullPosts routine
    useEffect(() => {
        pullPosts()
    }, [])

    //pullPosts will request all available posts from the api and save them in the posts state.
    const pullPosts = async () => {
        try {
            const res = await fetch("http://localhost:5000/all")
            const data = await res.json()
            setPosts(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    //verifyPin will attempt to retrieve the post message by querying the api with the supplied pin
    //The api will respond with a 200 status if correct and return the post message.
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
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].post_id === postid) {
                        posts[i].post_message = data.post_message
                        break;
                    }
                }
                close()
            } else {
                setPinNotifVisible(true)
            }
            setPin("")
        } catch (error) {
            console.log(error.message)
        }
    }

    //deletePost sends a delete request to the api with specified post id
    const deletePost = async (id) => {
        try {
            console.log(await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" }))
            setPosts(posts.filter(p => p.post_id !== id))
        } catch (error) {
            console.log(error.message)
        }
    }

    //savePostID saves the supplied post id and opens the pin modal for pin verification 
    const savePostID = (post_id) => {
        try {
            setPinNotifVisible(false)
            setPostid(post_id)
            open()
        } catch (error) {
            console.log(error.message)
        }
    }

    //exportSelectedRows grabs all posts that have been selected and exports them as a CSV
    const exportSelectedRows = async () => {
        const children = document.getElementById("table-data").childNodes
        var exportData = []
        //aware of how slow it is to find all selected exports,
        //would be more ideal to use a hashmap as the data structure for 
        //posts however will take too much time at this point to change it.
        children.forEach(child => {
            if (child.childNodes.item(4).childNodes.item(0).checked) {
                posts.filter(p => p.post_id == child.id.substring(10)).forEach(item => {
                    exportData.push(item)
                })
            }
        })
        setCSVData(exportData)
        if (exportData.length !== 0) {
            setExportCSV(true)
            await sleep(1)
            setExportCSV(false)
            setCSVData([])
        }
    }

    //sleep serves as a function to freeze a routine temporarily
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
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
                        <th>{exportCSV ? <CSVDownload data={csvData}></CSVDownload> : <button className="table-btn" onClick={exportSelectedRows}>Export</button>}</th>
                    </tr>
                </thead>
                <tbody id="table-data">
                    {posts.map(post => (
                        <tr id={`post-data-${post.post_id}`} key={post.post_id}>
                            <td>{post.post_creation}</td>
                            <td>{post.post_name}</td>
                            <td>{post.post_message !== "" ? post.post_message : <button className="table-btn" onClick={() => savePostID(post.post_id)}>Reveal</button>}</td>
                            <td><button className="table-btn" onClick={() => deletePost(post.post_id)}>Delete</button></td>
                            <td id="table-data-export" className="table-checkbox"><input id="table-data-export-checkbox" type="checkbox"></input></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal visible={false} width="800" height="400" effect="fadeInDown">
                <div className="popup-content">
                    <h3>Please enter a PIN</h3>
                    {pinNotifVisible ? <div className="popup-pin-notif"><p>Invalid Pin</p></div> : null}
                    <form onSubmit={verifyPin}>
                        <input type="number" id="list-pin-input" onChange={e => setPin(e.target.value)}></input>
                        <div className="popup-buttons">
                            <input type="submit" value="Submit" className="btn popup-btn"></input>
                            <button className="btn popup-btn" onClick={close}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
