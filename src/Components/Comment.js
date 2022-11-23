import React, { useState } from "react";

const Comment = ({ comment, getReplies, handleClick, replies }) => {
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");
  function handleClickBtn(kind, item) {
    setShow(true);
    setBody(item.body);
    handleClick(kind, item);
  }

  function handleKeyDown(e, comment, kind) {
    if (e.keyCode === 13 && e.target.value) {
      handleClick(kind, comment, e.target.value);
      setShow(false);
    }
  }

  return (
    <div>
      <div className="comment">
        <span>👨🏻‍✈️ {comment.author}</span>
        {show && comment.edit ? (
          <input
            type={"text"}
            autoFocus
            onBlur={() => setShow(false)}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, comment, "update")}
          />
        ) : (
          <p>{comment.body}</p>
        )}

        <div>
          <button onClick={() => handleClickBtn("edit", comment)}>Edit</button>
          <button onClick={() => handleClickBtn("reply", comment)}>
            Reply
          </button>
        </div>
        <div className="reply">
          {comment.reply && show && (
            <input
              type={"text"}
              autoFocus
              onBlur={() => setShow(false)}
              onKeyDown={(e) => handleKeyDown(e, comment, "add")}
            />
          )}
          {replies.map((item) => (
            <Comment
              key={item.id}
              comment={item}
              getReplies={getReplies}
              handleClick={handleClick}
              replies={getReplies(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
