import Modal from "@/components/Modal"
import PostPage from "@/containers/PostPage"
function Post({ params }) {
	return (
		<Modal>
				<PostPage id={params.id} />
		</Modal>
	)
}

export default Post