import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const body = await req.json()
		console.log("POST LOCATION API-> ", body);
		const postLocation = await prisma.PostLocations.findMany({
			where: {
				author: {
					email: body.userEmail
				}
			}
		})
		const data = await postLocation
		//console.log("POST LOCATION DATAS-> ", data)
		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		const data = { success: false, error: error.message };
		return NextResponse.json(data, { status: 500 })
	}
}

export async function DELETE(req){
	try {
		const { postImageID } = await req.json();
		const deleteLocation = await prisma.PostLocations.delete({
			where: {
				id: postImageID
			}
		});
		const data = { success: true }
		return NextResponse.json(data)
	} catch (error) {
		console.error(error);
		const data = { success: false, error: error.message };
	}
}