import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { auth } from "@/auth";
import StoreAuth from "@/components/store/StoreAuth";
import LostSession from "@/components/auth/lost/LostSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Login Auth",
	description: "kyoulee make app",
	icons: {
		other: [
			{
				url: '/icons/default.jpeg',
				media:
					'(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
				rel: 'apple-touch-startup-image',
			},
		],
	},
};

export const viewport: Viewport = {
	themeColor: 'black',
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
	console.debug("RootLayout");
	const session = await auth();
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session} >
					<StoreProvider>
						<StoreAuth userId={session?.user?.id} />
						{children}
					</StoreProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
