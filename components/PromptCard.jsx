"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    const { data: session } = useSession();

  const [copied, setCopied] = useState("");
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
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex flex-start justify-center gap-3 cursor-pointer"
        onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user-image"
            height={30}
            width={30}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="cursor-pointer">
          <abbr title="copy the text">
          <Image 
            onClick={handleCopy}
            alt="copy the text"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
          </abbr>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>


      {(session?.user.id === post.creator._id && 
      pathName === '/profile') && (
        <div className="mt-5 flex flex-center gap-4 border-t pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}>
            Edit
          </p>

          <p className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}>
            Delete
          </p>
        </div>
      )
      }
    </div>
  );
};

export default PromptCard;
