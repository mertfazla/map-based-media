import './globals.css'
import ProviderContext from "@/components/ProviderContext"
import Header from "@/components/Header"

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children}) {
	return (
		<ProviderContext>
			<html lang="en">
				<body className='text-md'>
					
					{children}
				</body>
			</html>
		</ProviderContext>
	)
}