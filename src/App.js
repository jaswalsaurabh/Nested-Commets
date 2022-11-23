import React, { useEffect, useLayoutEffect, useState } from "react";
import Comment from "./Components/Comment";
import { rawData } from "./Data/commentsData";
import "./App.css";
import useTraverseTree from "./hooks/use-traverse-tree";

const App = () => {
  const [comments, setComments] = useState(rawData);

  const { makeActive, insertNode, updateNode } = useTraverseTree();

  function getComments() {
    return comments.filter((item) => item.parent === null);
  }

  function getReplies(id) {
    return comments.filter((item) => item.parent === id);
  }

  function handleClick(kind, item, value) {
    if (kind === "edit" || kind === "reply") {
      let newtree = makeActive(comments, item.id, kind);
      setComments([...newtree]);
    } else if (kind === "add") {
      // function insertNode(tree, body, author, parent) {
      let newtree = insertNode(comments, value, item.author, item.id);

      setComments([...newtree]);
    } else {
      let newtree = updateNode(comments, value, item.id);
      setComments([...newtree]);
    }
  }

  return (
    <div>
      {getComments().map((item) => (
        <Comment
          key={item.id}
          comment={item}
          getReplies={getReplies}
          handleClick={handleClick}
          replies={getReplies(item.id)}
        />
      ))}
    </div>
  );
};

export default App;
