"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { utapi } from "uploadthing/server";

function UserPostsPage() {
	const [userPosts, setUserPosts] = useState([]);
	const { data, status } = useSession();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (status === "authenticated") {
			const userEmail = data.user.email;
			const handleFetch = async () => {
				try {
					const data = { userEmail: userEmail };
					const res = await axios.post("/api/posts", JSON.stringify(data), {
						headers: {
							"Content-Type": "application/json",
						},
					});
					setUserPosts(res.data);
					setLoading(false);
				} catch (error) {
					console.error(error);
				}
			};
			handleFetch();
		}
	}, [data]);


	const handleDeleteImage = async (postImageID, imageKey) => {
		try {
			const imageURL = imageKey.replace("https://uploadthing.com/f/", "");
			const res = await axios.delete("/api/posts", { data: { postImageID: postImageID, imageURL: imageURL } });
			const data = await res.data;
			setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postImageID));
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			{isLoading && <div>
				<h1>Loading...</h1>
			</div>}
			{!isLoading && userPosts.length === 0 && <div>
				<h1>There is no post</h1>
			</div>}

			{!isLoading && userPosts.length !== 0 && <div>
				<h1>Posts</h1>
				<div>
					{userPosts.map(post => {
						const creatingDate = Date.parse(post.createdAt)
						const creatingDateFormat = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(creatingDate);
						return (
							<div className="flex w-full h-full relative bg-slate-500 my-10" key={post.id}>
								<div className="">
									<span>
										<Image src={post.imageURL} alt="post image" width={640} height={480} />
									</span>

									<p className="bg">{creatingDateFormat}</p>
								</div>
								<div className="w-full ml-10">
									<h2 className="text-center bg-slate-300 w-full">{post.title}</h2>
									<p>{post.content}</p>
									<span>
										<button onClick={(e) => handleDeleteImage(post.id, post.imageURL)}>Delete</button>
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>}
		</div>
	)
}

export default UserPostsPage