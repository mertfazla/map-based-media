import { createUploadthing } from "uploadthing/next";
import { cookies } from 'next/headers'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const f = createUploadthing();

const auth = (req) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			const cookieStore = cookies();
			const token = cookieStore.get('next-auth.session-token').value;
			const userSession = await prisma.session.findUnique({
				where: { sessionToken: token },
			});
			const user = await prisma.user.findUnique({
				where: { id: userSession.userId },
			});
			console.log("User:", user);
			if (!user) throw new Error("Unauthorized");
			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.url);
			console.log("file->", file);
			console.log("metadata->", metadata);

			
		}),
};
