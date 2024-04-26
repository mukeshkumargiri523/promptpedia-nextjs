"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

function PromptCard({ post, handleTagClick, handleDelete, handleEdit }) {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  function handleCopy() {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card mb-2">
      <div className="flex flex-col gap-2">
        <div
          className="flex justify-between items-start gap-2"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3>{post.creator.username}</h3>
            <h5 className="font-inter text-md text-gray-500">
              {post.creator.email}
            </h5>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            {!copied ? <FaRegCopy /> : <FaCircleCheck />}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-4 font-satoshi text-sm text-gray-700">
            {post.prompt}
          </p>
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => {
              handleTagClick && handleTagClick(post.tag);
            }}
          >
            {post.tag}
          </p>
          <div className="flex ml-8 flex-row gap-6">
            {session?.user.id === post.creator._id &&
              pathName === "/profile" && (
                <p
                  className="font-inter p-1 border-2 border-slate-500 rounded-md font-bold text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </p>
              )}
            {session?.user.id === post.creator._id &&
              pathName === "/profile" && (
                <p
                  className="font-inter p-1 border-2 border-slate-500 rounded-md font-bold text-sm orange_gradient cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;
