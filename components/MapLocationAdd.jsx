"use client"
import "@uploadthing/react/styles.css";
import React, { useEffect, useState } from 'react';
import Textbox from "@/components/Textbox";
import { UploadButton } from "@uploadthing/react";
import NextImage from "next/image";

function MapLocationAdd({ longitude, latitude, handleSubmit }) {
	const [textboxContent, setTextboxContent] = useState("");
	const [imageURL, setImageURL] = useState(null);

	useEffect(() => {
	}, [longitude, latitude])
	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<div className="w-full bg-slate-50/20 pt-5 pb-10 ">
				<h1 className="text-xl bg-white/90 border rounded-2xl px-5 py-4 mb-5 w-fit m-auto shadow-xl">Select the image you want from the button below</h1>
				<div className="w-9/12 m-auto">
					<UploadButton
						endpoint="imageUploader"
						accept="image/png, image/jpeg"
						autoUpload={true}
						maxFiles={1}
						onClientUploadComplete={async (res) => {
							const [fileKey] = await res;
							const fileURL = `https://uploadthing.com/f/${fileKey.fileKey}`;
							const image = new Image();
							image.src = fileURL;
							image.onload = () => {
								if (image.width >= 640 && image.height >= 480) {
									setImageURL(fileURL);
									console.log("Upload complete! ", fileURL);
								} else {
									console.log("ERROR! Image resulation is too low");
								}
							};
						}}
						onUploadError={(error) => {
							console.log(`ERROR! ${error.message}`);
						}}
					/>
					<div className=" w-36 m-auto text-center mt-2">

						<h3>Uploaded image:</h3>

						{imageURL && (
							<NextImage
								src={imageURL}
								alt="Uploaded Image"
								width={100}
								height={100}
								className="m-auto"
							/>
						)}
					</div>

				</div>
			</div>

			<div className='w-full h-96 shadow-2xl pt-10  px-4 sm:px-5 md:px-7 lg:px-10 '>
				<h1 className="text-xl bg-white/90 border rounded-2xl px-5 py-4 mb-5 w-fit m-auto shadow-xl">Write anything you want to say about the picture</h1>
				<div className="flex flex-col items-center justify-center space-y-4 bg-slate-50">
					<Textbox onChange={setTextboxContent} />
				</div>
				<div className="w-full flex justify-center ">
					<button type="submit" onClick={e => {
						handleSubmit(e, imageURL, textboxContent)
					}} className=" transition bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-80 px-10 rounded focus:outline-none focus:shadow-outline-blue">
						Share!
					</button>
				</div>

			</div>

		</div>
	)
}

export default MapLocationAdd