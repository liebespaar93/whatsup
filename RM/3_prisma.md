---
title: 3_prisma.md
description: |-
	내용입력
date: Insert datetime string (⇧⌘I or Ctrl+Shift+I)
preview: 이미지 주소
draft: false
tags:
	- 테그없음
categories:
	- 카테고리없음
---

## prisma

### CLI

[![Image](https://www.prisma.io/docs/social/docs-social.png)](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)
🔗 링크 : <https://www.prisma.io/docs/orm/reference/prisma-cli-reference>

#### help(-h, --help)

> [!NOTE]
> 명령어 목록을 출력합니다.

```bash
npx prisma -h
```

#### init

> [!NOTE]
> 프로젝트에 prisma를 설정합니다

```bash
npx prisma init
```

설정시 ```prisma``` 폴더와 그안에 ```schema.prisma```파일이 생성됩니다.

#### generate

> [!NOTE]
> ```schema.prisma```파일에 정의된 토대로 Prisma Client를 생성합니다.

```bash
npx prisma generate
```

> [!TIP]
> ```schema.prisma```파일의 상태를 지속적으로 확인하고 싶으면
> ```--watch``` 명령어를 붙이면 편하다

```node_modules/@prisma/client```에 정보를 js 형식으로 생성합니다.
Prisma Client API를 사용할 수 있게 됩니다.

> [!WARNING]
> ```node_modules/@prisma/client```에 정의되어있음으로
> 정보를 수정했을시 한번더 설정을 업데이트 시켜주어야 한다

#### db

> [!NOTE]
> ```schema.prisma```파일의 토대로 db를 조작한다.

```bash
npx prisma db pull
npx prisma db push
npx prisma db seed
npx prisma db execute
```

| 명령어 | 설명 |
| :---: | :---: |
| pull | 현재 연결된 DB의 정보를 가져옵니다 |
| push | 현재 연결된 DB에 ```schema.prisma```에 정보를 입력합니다 |
| seed | seed 정보를 기록하고 등록할 수 있습니다. |
| excute | 현재 연결된 DB와 sql로 상호작용 할 수 있습니다. |

#### migrate

> [!NOTE]
> migrate DB상태를 기록하고 상태관리를 위한 명령어

[![Image](./assets/prisma_migrate.png)](https://www.prisma.io/docs/orm/prisma-migrate)
🔗 링크 :<https://www.prisma.io/docs/orm/prisma-migrate>

```bash
prisma migrate dev
```

상태관리를 위한 것이라 생각이된다

github 의 commit 과 같이 변경된 상태의 상황을 확인하고 기록하는 것을 중점으로 하는것 같다.

자세한 사항은 상위 링크를 통해 알아볼 수 있다.

![Image](./assets/prisma_deploy_db.png)

#### studio

> [!NOTE]
> 현재 prisma model 상태를 실시간으로 볼수 있다

```bash
npx prisma studio
```

<http://localhost:5555> 에 접속하여 실시간 데이터 정보를 확인 할 수 있다.

![Alt text](./assets/prisma_studio.png)

실제 데이터를 넣어 적용하는 것도 가능하다.

![Alt text](./assets/prisma_studio_1.png)

상위 입력 실행후 postgresql 데이터

```sql
mydb=> select * from "User";
 id |     email      |  name
----+----------------+---------
  1 | test@email.com | test
  2 | kyoulee@42.fr  | kyoulee
(2 rows)
```

#### validate

> [!NOTE]
> ```schema.prisma```을 검증합니다.

[![Alt text](./assets/prisma_database.png)](https://www.prisma.io/docs/orm/prisma-schema)

🔗 링크 : <https://www.prisma.io/docs/orm/prisma-schema>

```bash
npx prisma validate
```

#### format

> [!NOTE]
> ```schema.prisma```에 맞쳐 포맷을 합니다.

```bash
npx prisma format
```

#### version(-v)

> [!NOTE]
> 버전 및 현재 정보들을 출력합니다

```bash
npx prisma -v
```

#### debug

> [!NOTE]
> debug 및 버그에 대한 정보를 출력합니다.

```bash
npx prisma debug
```

[ 🫥 추가 정보가 필요해요!]

### prisma 실습

#### 페키지 설치

prisma 페키지 받기

```bash
npm i prisma
npm i @prisma/client

npx prisma
```

#### prisma 환경설정

```bash
npx prisma init
```

설정시 ```prisma``` 폴더와 그안에 ```schema.prisma```파일이 생성된다

#### 📃 prisma/schema.prisma

파일을 원하는 형식에 맞게 수정해 준다

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

```schema.prisma``` 파일을 수정후

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

에 들어갈 ```DATABASE_URL```를 ```.env```에 설정해 준다

```json
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
DATABASE_URL="postgresql://kyoulee:0000@localhost:5432/mydb?schema=public"
```

#### DB schema.prisma 에 맞게 생성

> [!WARNING]
> 사용자가 DB 생성할 수 있는 권한이 있어야 한다
> ![Alt text](./assets/prisma_postgres_role_create_db.png)

```bash
npx prisma db push
```

#### Client 생성

설정이 끝나면 ```generate```를 하여 ```client```를 만들어 준다

```bash
npx prisma generate
```

#### 코드로 만들어 보기

> [!WARNING]
> 임시로 만든 데이터를 삭제해주세요

상위 DB에 값을 넣을 수 있는 코드를 실습해보자

#### 📃 prisma_test.ts

```lib``` 폴더에 사용하고자 하는 기능을 넣어 함수화 한다

```ts
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
			email: 'test@email.com', // 고유값이니 지속적으로 변경해주세요
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
```

상위 코드로 원하는 함수를 꺼내 사용 할 수 있다
