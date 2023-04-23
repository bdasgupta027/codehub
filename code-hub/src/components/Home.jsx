import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import supabase from "../client";


const Home = ( {posts, setPosts, upvotePost, downvotePost, addPost, deletePost} ) => {
    
    const [search, setSearch] = useState('');
    // add functionality for sorting by upvotes and downvotes or date
    const [sort, setSort] = useState('created_at');
    const [order, setOrder] = useState('false');


    
    useEffect(() => {
        const fetchPosts = async () => {

            let { data: posts, error } = await supabase.from('posts').select('*').order(sort, { ascending: order === '1' ? true : false });
            if (error) console.log('error', error);
            else setPosts(posts);
            
        };

        fetchPosts();
    }, [posts]);

    const handleSelect = (e) => {
        setSort(e.target.value);
        setOrder(e.target.value2);
    }


    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
    });


  return (
    <div>
        <h1>CodeHub👨‍💻</h1>
        <h3>A place for CS majors/new grads to share projects or ask career-related/programming questions!</h3>
        <input className="search-bar" type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />

        <select className="search-button" onChange={handleSelect}>
            <option value="created_at" value2="false">Search By Date</option>
            <option value="upvotes" value2="false">Search by Upvotes</option>
            <option value="downvotes" value2="false">Search by Downvotes</option>
        </select>

        

        <div className="header-row">
            <h2>Posts</h2>
        </div>

        <Link to="/create"> <button className="create-post-button">Create Post</button> </Link>   

        <div className="posts">
            {filteredPosts.map((post) => (
                <div className="post" key={post.id}>
                    <div className="post-link">
                        <Link to={`/post/${post.id}`}>
                            <img src={post.image_url} alt="" className="card-image" />
                            <div className="post-info-row">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-date">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="post-content">
                        <p>{post.content}</p>
                    </div> */}
                    <div className="post-buttons">
                    {/* <p>{post.upvotes} Upvotes</p>
                    <p>{post.downvotes} Downvotes</p> */}
                    <button onClick={() => upvotePost(post.id)} className="upvote-button"> ⬆️: {post.upvotes} </button>
                    <button onClick={() => downvotePost(post.id)}className="downvote-button"> ⬇️: {post.downvotes} </button>
                    {/* delete button */}
                    <button onClick={() => deletePost(post.id)} className="delete-button">Delete</button>
                    </div>

                </div>
            ))}
        </div>


    </div>
  )
}

export default Home