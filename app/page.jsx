import Link from "next/link";
export default function Home() {

	return (
		<div className="bg-white min-h-screen w-full mt-16">
			<Link className="text-black" href={"/view-map"} >Open the map</Link>
		</div>
	);
}