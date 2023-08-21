import Title from "@/components/HomePage/Title";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-homepage-bg bg-cover bg-no-repeat bg-top z-0 w"></div>
			<div className=" min-h-screen w-full z-20 relative flex flex-col justify-center items-center -translate-y-6 mt-14">
				<div className=" shadow-md backdrop-filter backdrop-blur-xl z-30 px-20 py-10 flex flex-col items-center gap-y-5 w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
					<Title Title1="Your picture sharing map" Title2="see what people are sharing on the map and join the community by sharing!" />
					<Link className="text-black px-5 py-4 font-semibold border-black shadow-xl hover:bg-blue-200/20 rounded-lg transition border-2 flex items-center gap-2" href={"/view-map"} >Open the map <Image src={'/navigate-next.svg'} width={25} height={25} alt="icon-next"></Image> </Link>
			</div>
		</div >

		</>
	);
}