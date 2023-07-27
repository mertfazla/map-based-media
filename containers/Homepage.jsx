"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Textbox from "@/components/Textbox";
import Button from "@/components/Button";
import Map from "@/components/Map";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import PostSection from "@/components/PostSection";
import MapLocationAdd from "@/components/MapLocationAdd";

function Homepage() {
const [textboxContent, setTextboxContent] = useState("");
const [posts, setPosts] = useState({});
const [isLoading, setLoading] = useState(false);
//==========Check user is authenticated================
const { data, status } = useSession({
	required: true,
	onUnauthenticated() {
		redirect("/api/auth/signin")
	}
});

//==========When user click delete buton for remove post================
const handleDelete = async (postID) => {
	const res = await axios.delete(`http://localhost:3000/api/posts`, { data: { postID: postID } })
	const data = await res.data;
	setPosts(prevPosts => prevPosts.filter(post => post.id !== postID));
	console.log(data);
}

//==========When user click submit buton for append post================
const handleAdd = async () => {
	try {
		const tempID = "t_"+posts[posts.length - 1]?.id || "t_";
		const data = { title: 'New Test Post', content: textboxContent };
		const newPost = { id: tempID, title: data.title, content: data.content };
		setPosts(prevPosts => ([...prevPosts, newPost]));

		const response = await axios.post('/api/posts', JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const newPostID = await response.data.postID;
	
		setPosts( prevPosts => {
			console.log("prev post->", prevPosts)
			const updatedPosts = prevPosts.map(
				post => post.id === tempID ? { ...post, id: newPostID } : post
			);
			return updatedPosts;
		});

	} catch (error) {
		console.error(error);
	}
}

//=========Fetch post from database================
const fetchPosts = async () => {
	try {
		setLoading(true);
		const response = await axios.get("/api/posts");
		const data = await response.data;
		console.log(data)
		setPosts(data);
		setLoading(false);
	} catch (error) {
		console.log(error);
	}
}

useEffect(() => {
	fetchPosts();
}, []);

return (
	<div>
		<Map />
		<Textbox onChange={setTextboxContent} />
		<Button text={"Submit"} onClick={handleAdd} />
		<PostSection posts={posts} loading={isLoading} handleDelete={handleDelete} />
	</div>

)
}

export default Homepage