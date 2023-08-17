import PostPage from "@/components/PostPage/PostPage"
function Post({params}) {
	return (
		<>
			<PostPage id={params.id}/>
		</>
	)
}

export default Post