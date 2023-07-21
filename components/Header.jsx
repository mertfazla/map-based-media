"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import Image from 'next/image';

function Homepage() {
	const { data, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin")
		}
	});

	return (
		<div>
			{status === "loading" &&
				<nav className="w-full h-12 bg-teal-100 justify-center items-center">
					<ul className="flex flext-column justify-between items-center li-none mx-2 w-full h-full">
						<li className="flex text-xl ml-12">MEDIA</li>
						<li className="flex mx-2 bg-slate-300 items-center gap-2">
							LOADING...
						</li>
					</ul>
				</nav>}
			{status === "authenticated" && <div>
				<nav className="w-full h-12 bg-teal-100 justify-center items-center">
					<ul className="flex flext-column justify-between items-center li-none mx-2 w-full h-full">
						<li className="flex text-xl ml-12">MEDIA</li>
						<li className="flex mx-2 bg-slate-300 items-center gap-2">
							<a className="cursor-pointer" onClick={() => signIn()}>signout</a>
							<Image src={data.user.image} alt="Picture of the author" width={32} height={32} />
						</li>
					</ul>
				</nav>
			</div>
			}
			{status === "unauthenticated" && <div>
				<a onClick={() => signIn()}>signin</a>
			</div>
			}
		</div>
	)
}

export default Homepage