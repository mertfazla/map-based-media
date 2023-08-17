import { NextResponse } from 'next/server'


export async function middleware( request ) {
	const userToken = request.cookies.get('next-auth.session-token')?.value;
	if(!userToken) {
		return NextResponse.redirect(new URL('/api/auth/signin',request.url))
	 }
	 return NextResponse.next()
}

export const config = {
	matcher: ['/view-map', '/share', '/posts/:path*','/user/:path*'],
}