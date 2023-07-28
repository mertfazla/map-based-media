"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function PostPage({ id }) {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const handleFetch = async () => {
		const res = await axios.get(`/api/posts/${id}`)
		const data = await res.data
		console.log(data)
		setData(data);
		setLoading(false);
	}
	useEffect(() => {
		handleFetch();
	}, [])
	return (
		<div>
			{loading && <p>Loading...</p>}
			{!loading &&
				<>
					<h1>Post Page</h1>
					<div>
						<Image src={data.imageURL} alt="shared image" width={500} height={500} />
					</div>
					<div>
						<p>Post ID: {id}</p>
						<p>Longitude: {data.longitude}</p>
						<p>Latitude: {data.latitude}</p>
					</div>
					<div>
						Shared by: {data?.author?.name}
					</div>
				</>
			}
		</div>
	)
}

export default PostPage