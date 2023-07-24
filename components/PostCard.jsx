import { useEffect, useState } from "react";
function PostCard({ postID, title, content, handleDelete }) {
const [deleteLoading, setDeleteLoading] = useState(false);
const [animationFade, setAnimationFade] = useState("animate-fade-up");

useEffect(() => {
	if (!postID.includes("t_")) {
		setAnimationFade("");
	}
}, [postID]);

return (

	

	<div className={`flex justify-center relative w-full ${deleteLoading ? "opacity-50 animate-fade-down" : "opacity-100"} ${animationFade}`}>
		<div className="flex flex-col border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative w-10/12 p-10 m-10 rounded-2xl">
			<div className="mb-6 text-xl" dangerouslySetInnerHTML={{ __html: title }} />
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{postID != undefined && <button onClick={() => {
				handleDelete(postID);
				setDeleteLoading(true);
			}
			} >Delete</button>}

		</div>
	</div>
)
}

export default PostCard