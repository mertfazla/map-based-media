import Image from 'next/image'
export default function CustomImage({ imageURL, alt }) {

	return (
			<Image
				src={imageURL}
				alt={alt}
				width={1280}
				height={720}
				className=' object-cover max-h-9/12'
				
			/>
	)
}