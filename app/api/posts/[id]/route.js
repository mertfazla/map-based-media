import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
const prisma = new PrismaClient();

export async function GET(req, {params}) {
	try {
		console.log(params)
		const post = await prisma.PostLocations.findUnique({		
			where: {
				id: params.id,
			},
			include: {
				author: true,
			},
		})
		const data = await post
		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		const data = { success: false, error: error.message };
		return NextResponse.json(data, { status: 500 })
	}
}