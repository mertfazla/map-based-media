"use client"
import { useEffect, useState } from "react";
import PostCard from "./PostCard"

function PostSection({ posts, loading, handleDelete}) {
const [postList, setPostList] = useState([]);

useEffect(() => {
	console.log("evet degisti")
	setPostList(posts);
}, [posts]);

return (
	<div>
		{loading && <div>Loading...</div>}
		{!loading && postList.length === 0 && <div>No posts</div>}
		{!loading && postList.length > 0 && (
			<div>
				{postList.map((post) => {
					return <PostCard key={post.id} postID={post.id} title={post.title} content={post.content} handleDelete={handleDelete} />;
				})}
			</div>
		)}
	</div>
);
}

export default PostSection