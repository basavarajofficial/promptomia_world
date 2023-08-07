"use client"

import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = ({params}) => {

    const searchParams =  useSearchParams();
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();

            setUserPosts(data);
        };
        if(params?.id) fetchPosts();
    }, [params.id]);


  return (
    <Profile
    name={userName}
    desc={`Welcome to ${userName} Profile`}
    data={userPosts}
/>
  )
}

export default UserProfile
