---
title: 9_api.md
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



기존 고전 방식의 데이터 전달 코드

> [TREE]
> /app/(protected)/setting

```tsx
type UserInfoAvatarProps = {
	avatar: string | null | undefined
}

async function onUploadAvatar(nickname: string, file: File | undefined) {
	if (!nickname || !file)
		return null;
	const response = await fetch('http://localhost:3000/api/avatar/upload', {
		method: "POST",
		body: JSON.stringify({
			nickname: "test",
			avatar: "test",
		}),
		headers: {
			"Content-Type": "application/json",
		}
	})
	return response;
}

function UserInfoAvatar(props: UserInfoAvatarProps) {
	const [file, setFile] = useState<File | undefined>();

	async function clickevent(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const a = await onUploadAvatar("test", file)
		console.log("test", a)
	}

	function onChnageAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		setFile(target.files ? target.files[0] : undefined);
		console.log(file)
	}

	return (
		<div>
			<Avatar className='m-auto max-h-36 max-w-36 object-contain w-auto h-auto'>
				<AvatarImage alt='avatar' src={props.avatar ?
					DEFAULT_USER_IMAGE_DIR + props.avatar :
					DEFAULT_USER_IMAGE_DIR + "default.jpeg"} />
				<AvatarFallback><p>Avatar error</p></AvatarFallback>
			</Avatar>
			<input className='file' type="file" name="image" onChange={onChnageAvatar} ></input>
			<Button onClick={clickevent} className='m-auto mt-4 w-36'>이미지 변경</Button>
		</div>
	)
}

```

기존 데이터 api 방식

> [TREE]
> /app/api/avatar/upload

```tsx
export async function POST(request: Request, context: { params: PostParam }) {
	console.log(await request.json())
	const newcomment = {
		id: 1,
		text: 1,
	}
	const res = new Response(
		JSON.stringify(newcomment), {
		headers: {
			"Content-Type": "application/json",
		}
	})
	return (res)
}
```

좀더 보기좋은 방식

```bash
npm install axios
npm install swr
```

### blob 꼭필요한가???


blob 이란 데이터를 바이너리 형식으로 변환하기 위하여 사용된다
이러한 이점으로는 데이터를 잘라서 분할 전송 등을 하며 여러개의 소켓통신으로 좀더 빠른 데이터를 전송 할 수 있다
그렇지만 지금은 인터넷 속도가 느리거나 하지 않으며 이미지를 전송하는데 문제가 되지 않을거라 생각된다 그럼으로 페스 하겟다
