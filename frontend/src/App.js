import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(["Working", "Sleep", "Work"]);
  useEffect(() => {}, []); //Get Posts from backend
  return (
    <div className="App">
      {posts.map((post) => {
        return <p>{post}</p>;
      })}
    </div>
  );
}

export default App;
