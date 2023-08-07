"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
    const { data : session } = useSession();

    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
      
        setPosts(data);
      };
    
      useEffect(() => {
        if(session?.user.id)  fetchPosts();
      }, []);

      console.log(posts);


      // edit the prompt
    const handleEdit=(post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }


    // delete the prompt
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p) =>{return p._id !== post.id});

          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }



  return (
    <Profile
        name="My"
        desc="Welcome to your Profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
