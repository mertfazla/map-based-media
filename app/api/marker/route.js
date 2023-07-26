import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
const prisma = new PrismaClient();

export async function POST(req) {
	
	try {
		//=============Find the user from the session token================
		const cookieStore = cookies();
		const token = cookieStore.get('next-auth.session-token').value;
		const userSession = await prisma.session.findUnique({
			where: { sessionToken: token },
		});
		const user = await prisma.user.findUnique({
			where: { id: userSession.userId },
		});

		const body = await req.json()
		const { latitude, longitude, imageURL } = body;
		
		const newPostLocation = await prisma.PostLocations.create({
			data: {
				latitude: body.latitude,
				longitude: body.longitude,
				imageURL: body.imageURL,
				title: "image",
				content: "image content",
				authorId: user.id,
			},
		});
		const data = { success: true }
		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		const data = { success: false, error: error.message };
		return NextResponse.json(data, { status: 500 })
	}
}

export async function GET() {
	const posts = await prisma.PostLocations.findMany();
	const data = await posts
	return NextResponse.json(data)
}

export async function PUT(req) {


}
export async function DELETE(req) {
	const { postLocationID } = await req.json();
	if (!postLocationID) return NextResponse.json({ success: false, error: 'No id provided' }, { status: 400 });
	const deleteRes = await prisma.post.delete({
		where: {
			id: postLocationID,
		},
	});
	const data = { success: true }
	return NextResponse.json(data)

}