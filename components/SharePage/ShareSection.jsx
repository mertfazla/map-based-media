"use client"

import { MarkerClusterer } from "@react-google-maps/api";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./Map";

export default function ShareSection() {

	const { data, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin")
		}
	});

	return (
		<>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} version="beta" libraries={["marker"]}>
				<Map />
			</Wrapper>
		</>
	)
}