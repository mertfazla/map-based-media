"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const Navbar = () => {
	const { data, status } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<nav className=" top-0 left-0 w-full z-50 fixed bg-white/30 border-gray-200 dark:bg-gray-900 bg-gradient-to-b from-blue-400/20 via-blue-300/20 to-blue-200/20 backdrop-blur-lg">
			<div className=" h-16 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
				<Link href="/">
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Media Map</span>
				</Link>

				<div className="flex items-center md:order-2">
					{data?.user?.image ? <>
						<button
							type="button"
							className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button"
							aria-expanded={isMenuOpen}
							onClick={toggleMenu}
						>
							<span className="sr-only">Open user menu</span>
							{
								data?.user?.image && <Image className='rounded-full object-cover' src={data?.user?.image} alt="user avatar" width={30} height={30} />
							}
						</button>

						{/* Dropdown menu */}
						<div
							className={`z-50 ${isMenuOpen ? '' : 'hidden'} absolute top-full right-0 origin-top-right w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
							id="user-dropdown"
						>
							<div className="px-4 py-3">
								<span className="block text-sm text-gray-900 dark:text-white">{data?.user?.name}</span>
								<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{data?.user?.email}</span>
							</div>
							<ul className="py-2" aria-labelledby="user-menu-button">
								<li>
									<Link
										href={`/user/posts`}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										My Posts
									</Link>
								</li>
								<li>
									<a
										href="#"
										className=" cursor-default block opacity-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Settings
									</a>
								</li>
								<li>
									<a
										href="#"
										onClick={() => signOut()}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Sign out
									</a>
								</li>
							</ul>
						</div>

						<button
							data-collapse-toggle="navbar-user"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-user"
							aria-expanded={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</> : <Link className='text-white flex bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-lg' href='/api/auth/signin' >Login</Link>
					}
				</div>

				<div
					className={`items-center flex justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
					id="navbar-user"
				>
					<ul className="flex w-full flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
						<li className='block m-auto'>
							{data?.user?.image ? <Link href='/share' className='text-md p-4 bg-cyan-200 rounded-3xl hover:bg-cyan-100 border-slate-500  shadow-xl transition'>
								Share Image
							</Link> : ''}
						</li>
					</ul>
				</div>

			</div>
		</nav>
	);
};

export default Navbar;