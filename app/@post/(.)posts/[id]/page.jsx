import Modal from "@/components/Modal/Modal"
import PostPage from "@/components/PostPage/PostPage"
function Post({ params }) {
	return (
		<Modal>
				<PostPage id={params.id} />
		</Modal>
	)
}

export default Post