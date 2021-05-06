const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./database")

app.use(express.json())
app.use(cors())

//DATABASE QUERIES
//all GET endpoint will respond with all posts in the database. 
app.get("/all", async (req, res) => {
    try {
        const post = await db.query("SELECT post_id, post_email, post_name, post_creation FROM posts")
        var sendData = new Map()
        for (var i = 0, row; row = post.rows[i]; i++) {
            post.rows[i] = { ...post.rows[i], post_message: "" }
        }
        res.status(200).send(post.rows)
        console.log("200 -> /all")
    } catch (error) {
        res.status(500).send(error.message)
        console.log(`500 -> /all ${error.message}`)
    }
})

//post POST endpoint with insert a post into the database
app.post("/post", async (req, res) => {
    try {
        const data = req.body;
        const post = await db.query("INSERT INTO posts (post_name, post_email, post_pin, post_message) VALUES($1, $2, $3, $4) RETURNING *",
            [data.name, data.email, data.pin, data.message])
        res.status(200).send(post.rows[0]);
        console.log("200 -> /post")
    } catch (error) {
        res.status(500).send(error.message)
        console.log(`500 -> /post -> ${error.message}`)
    }
})

//delete DELETE endpoint will remove a specified post_id entry from the database
app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNaN(id)) {
            const post = await db.query("DELETE FROM posts WHERE post_id = $1",
                [id])
            res.status(200).send("Successful")
            console.log("200 -> /delete")
        } else {
            res.status(406).send("post_id must be an integer")
            console.log("406 -> /delete -> post_id must be an integer")
        }
    } catch (error) {
        res.status(500).send(error.message)
        console.log(`500 -> /delete -> ${error.message}`)
    }
})

//auth POST endpoint will verify the pin of a post and respond with 200 -> ok or 406 -> invalid pin
app.post("/auth", async (req, res) => {
    try {
        const { post_id, post_pin } = req.body;
        const data = await db.query("SELECT post_pin, post_message FROM posts WHERE post_id = $1", [post_id])
        if (post_pin == data.rows[0].post_pin) {
            res.status(200).send(data.rows[0])
            console.log("200 -> /auth")
        } else {
            res.status(406).send("Invalid PIN")
            console.log(`406 -> /auth -> Invalid PIN`)
        }
    } catch (error) {
        res.status(500).send(error.message)
        console.log(`500 -> /auth -> ${error.message}`)
    }
})

//api listens on the port 5000 on localhost
app.listen(5000, () => {
    console.log("API listening on port 5000.")
})