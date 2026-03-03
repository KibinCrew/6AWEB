const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb://localhost:27017";
const DATABASENAME = "MyDb";
let database;

async function start() {
  try {
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    await client.connect();
    database = client.db(DATABASENAME);
    console.log("Connected to MongoDB");
    app.listen(5038, () => console.log("Server running on port 5038"));
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
start();

app.use((req, res, next) => {
  if (!database) return res.status(503).json({ error: "Database not connected" });
  next();
});

// GET ALL BOOKS
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ADD A BOOK (Single clean route)
app.post("/api/books/AddBook", multer().none(), async (req, res) => {
  try {
    const numOfDocs = await database.collection("Books").countDocuments();
    await database.collection("Books").insertOne({
      id: String(numOfDocs + 1),
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description, // Synchronized naming
      price: Number(req.body.price) || 0,
    });
    res.json("Added Successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// UPDATE A BOOK
app.put("/api/books/UpdateBook", multer().none(), async (req, res) => {
  try {
    const bookId = req.query.id;
    await database.collection("Books").updateOne(
      { id: bookId },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          description: req.body.description,
          price: Number(req.body.price) || 0,
        }
      }
    );
    res.json("Updated Successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// DELETE BOOK
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    await database.collection("Books").deleteOne({ id: req.query.id });
    res.json("Deleted successfully!");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});