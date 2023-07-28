import PostPage from "@/containers/PostPage"
function Post({params}) {
	return (
		<div>
			<PostPage id={params.id}/>
		</div>
	)
}

export default Post