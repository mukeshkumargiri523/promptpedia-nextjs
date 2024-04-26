"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-14 ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);

  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPrompt();
  }, []);

  const [posts, setPosts] = useState([]);
  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  function handleSearchChange(e) {
    // e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    console.log(e.target.value);
    //debounce search
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);
        console.log("search result", searchResult);
        setSearchedResult(searchResult);
      }, 400)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompt(tagName);
    setSearchedResult(searchResult);
  };
  return (
    <section className="feed">
      <form className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="Search by a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;
