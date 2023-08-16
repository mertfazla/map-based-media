"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";

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
		console.log(data)
		handleFetch();
	}, [])
	return (
		<>
			
			{!loading && (
				<>
					<div className="flex flex-col w-full h-full relative">
						<div className="flex flex-col justify-center items-center bg-cyan-100 shadow-xl mb-4">
							<CustomImage imageURL={data.imageURL} alt={data.title} />
						</div>
						<div className="h-full p-2">
							<li className="flex flex-col h-full text-lg items-center">
								<li className="flex justify-between w-10/12 sm:11/12 items-center">
									<div className="flex flex-row gap-5">
										<Image src={data.author.image} width={40} height={40} alt="profile-photo" className="rounded-full border-none object-cover" />
										<p className="w-full flex items-center">{data?.author?.name}</p>
									</div>
									<div className=" italic opacity-60">
										{data.createdAt}
									</div>
								</li>
								<hr className=" my-4" />
								<article className="flex flex-col gap-y-4 ">
									<h1 className="w-full lg:w-10/12 text-center sm:w-11/12 font-bold text-xl mx-auto ">{data.title}</h1>
									<p className="w-full lg:w-10/12 sm:w-11/12 mx-auto" dangerouslySetInnerHTML={{ __html: data.content }} />
								</article >
							</li>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default PostPage