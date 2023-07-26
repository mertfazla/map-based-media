import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('next-auth.session-token').value;
		const userSession = await prisma.session.findUnique({
			where: { sessionToken: token },
		});
		const user = await prisma.user.findUnique({
			where: { id: userSession.userId },
		});
		const body = await req.json()
		const { title, content } = body;
		const newPost = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: user.id,
			},
		});
		const data = { success: true, postID: newPost.id, title: newPost.title, content: newPost.content, author: user.name }
		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		const data = { success: false, error: error.message };
		return NextResponse.json(data, { status: 500 })
	}
}

export async function GET() {
	const posts = await prisma.post.findMany();
	const data = posts
	console.log(data)
	return NextResponse.json(data)
}

export async function PUT(req) {


}
export async function DELETE(req) {
	const { postID } = await req.json();
	if (!postID) return NextResponse.json({ success: false, error: 'No id provided' }, { status: 400 });
	const deleteRes = await prisma.post.delete({
		where: {
			id: postID,
		},
	});
	const data = { success: true }
	return NextResponse.json(data)

}