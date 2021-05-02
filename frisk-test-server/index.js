const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./database")

app.use(express.json())
app.use(cors())

//DATABASE QUERIES
//get all posts as json
app.get("/all", async(req, res) => {
    console.log("Received get all posts GET request")
    try {
        const post = await db.query("SELECT post_id, post_name, post_creation FROM posts")
        res.status(200).send(post.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//save post into database
app.post("/post", async(req, res) => {
    console.log("Received post request")
    try {
        const data  = req.body;
        const post = await db.query("INSERT INTO posts (post_name, post_email, post_pin, post_message) VALUES($1, $2, $3, $4) RETURNING *", 
        [data.name, data.email, data.pin, data.message])
        res.status(200).send(post.rows[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//delete post from database via post_id
app.delete("/delete/:id", async(req, res) => {
    console.log("Received post deletion request")
    try {
        const {id} = req.params;
        const post = await db.query("DELETE FROM posts WHERE post_id = $1", 
        [id])
        res.status(200).send("Entry sucessfully deleted.")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/auth", async(req, res) =>{
    console.log("Received post message authorisation request")
    try {
        const {post_id, resPin}  = req.body;
        const data = await db.query("SELECT post_pin, post_message FROM posts WHERE post_id = $1", [post_id])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(5000, () => {
    console.log("API listening on port 5000.")
})