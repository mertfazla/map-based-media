import PostPage from "@/containers/PostPage"
function Post({params}) {
	return (
		<>
			<PostPage id={params.id}/>
		</>
	)
}

export default Post