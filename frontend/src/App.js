import { useEffect, useState } from "react";
import request from "./services/request.js";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState("");

  //Get Posts from backend
  const getPosts = async () => {
    const res = await request.get("/");
    setPosts(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const addPost = async () => {
    setEditing(false);
    if (newPost !== "") {
      const res = await request.post("/", {
        title: newPost,
      });
      setPosts((prevPosts) => {
        return [...prevPosts, res.data];
      });
    }
    setNewPost("");
  };

  return (
    <div className="App">
      <div className="navbar">
        <nav>
          <div className="title">
            <h2>Forum App</h2>
          </div>
        </nav>
      </div>
      <div className="newPost">
        {editing && (
          <input
            type="text"
            value={newPost}
            onChange={(e) => {
              setNewPost(e.target.value);
            }}
            onBlur={() => {
              addPost();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPost();
              }
            }}
            autoFocus
          />
        )}
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(true);
            }}
          >
            New Post
          </button>
        )}
      </div>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="postCard">
              <p key={post._id}>{post.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
