import React from 'react';

export default function Todo(props) {
  const content = props.posts.map((post) => (
    <div key={post.id} className="mylist">
      <div id='blo'>
        <label className="checkbox-btn" htmlFor={`checkbox-${post.id}`}>
        <input
          id={`checkbox-${post.id}`}
          type="checkbox"
          name="isDone"
          defaultChecked={post.isChe ? true : false}
          onClick={() => props.onChecked(post.id)}
        />
        <span className="checkmark"></span>
        </label>
        <label>Done</label>
        <button id='del' onClick={() => props.onclicked(post.id)}>delete</button>
      </div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));

  return (
    <div>
      {content}
    </div>
  );
}
