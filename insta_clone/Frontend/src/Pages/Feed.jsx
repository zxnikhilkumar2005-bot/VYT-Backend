import React, { useState,useEffect } from 'react'
import axios from 'axios'


const Feed = () => {

    const [posts, setPosts] = React.useState([{
        id: 1,
        image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
        caption: 'Beautiful scenery',
    }])

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
        .then((res) =>{
            setPosts(res.data.posts)
        })
    },[])
    return (
        <div>
            <section className='feed-section' >
                {
                    posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={post._id ?? post.id ?? `post-${index}`} className='post-card' >
                                <img src={post.image} alt={post.caption} />
                                <p className='caption'>{post.caption}</p>
                            </div>
                        ))
                    ) : (
                        <h1>NO posts available </h1>
                    )
                }
            </section>
        </div>
    )
}

export default Feed
