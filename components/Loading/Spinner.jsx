import Image from "next/image"
import SpinnerSVG from "@/public/spinner-1s-250px.svg";

const Spinner = ({ width, height }) => {
	return (
		<Image alt="spinner" src={SpinnerSVG} width={width} height={height} sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 50vw" quality={40} />
	)
}

export default Spinner