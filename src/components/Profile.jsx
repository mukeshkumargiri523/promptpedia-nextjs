import React from "react";
import PromptCard from "./PromptCard";

function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text mb-2 text-left blue_gradient">
        <span>{name}</span> Profile
      </h1>
      <p className="desc  text-left">{desc}</p>
      <div className="mt-14 ">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
