function PostCard({ postID, title, content, handleDelete }) {
	console.log(postID, title, content)
	return (
		<div className="flex justify-center relative w-full ">
			<div className="flex flex-col border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative w-10/12 p-10 m-10 rounded-2xl">
				<div className="mb-6 text-xl" dangerouslySetInnerHTML={{ __html: title }} />
				<div dangerouslySetInnerHTML={{ __html: content }} />
				<button onClick={()=> handleDelete(postID)} >Delete</button>

			</div>
		</div>
	)
}

export default PostCard