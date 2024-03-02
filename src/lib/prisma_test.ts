import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function prisma_test_user_select_all() {
	// ... you will write your Prisma Client queries here
	const allUsers = await prisma.user.findMany()
	console.log(allUsers)
}

/**
 * prisma_test_user_select_all 사용 방법
prisma_test_user_select_all().then(async () => {
	await prisma.$disconnect()
}).catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})
*/

export async function prisma_test_user_create() {
	await prisma.user.create({
		data: {
			name: 'new_test',
			email: 'test@email.com',
			posts: {
				create: { title: 'Hellow World' }
			},
			profile: {
				create: { bio: 'Hi kyoulee' }
			},
		},
	})

	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
			profile: true,
		},
	})
	console.log(allUsers, { depth: null })
}

/**
 * prisma_test_user_create 사용 방법
prisma_test_user_create().then(async () => {
	await prisma.$disconnect()
}).catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})
*/
