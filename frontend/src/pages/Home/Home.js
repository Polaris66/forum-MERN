import { useEffect, useState } from "react";

import request from "../../services/request.js";

import "./Home.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [user, setUser] = useState(null);
  //Get User from backend
  const getUser = async () => {
    const res = await request.get("/auth/");
    setUser(res.data.body.username);
  };
  //Get Posts from backend
  const getPosts = async () => {
    setPosts(JSON.parse(localStorage.getItem("posts")));
    const res = await request.get("/");
    setPosts(res.data.body);
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const addPost = async () => {
    setEditing(false);
    if (newPost !== "") {
      const res = await request.post("/", {
        title: newPost,
      });
      setPosts((prevPosts) => {
        return [...prevPosts, res.data.body];
      });
    }
    setNewPost("");
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  return (
    <div className="Home">
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
        {posts &&
          posts.map((post) => {
            return (
              <div className="postCard" key={post._id}>
                <p>{post.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
