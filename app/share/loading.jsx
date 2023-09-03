import Spinner from "@/components/Loading/Spinner"
function loading() {
	return (
		<div className="flex flex-col w-full h-screen relative justify-center items-center -translate-y-10 ">
			<Spinner width={150} height={150} />
		</div>
	)
}

export default loading