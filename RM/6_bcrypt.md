---
title: 7_bcrypt.md
description: |-
	내용입력
date: Insert datetime string (⇧⌘I or Ctrl+Shift+I)
preview: 이미지 주소
draft: false
tags:
	- 보안
	- bcrypt
categories:
	- bcryp
---

```bash
npm i bcrypt
npm i -D @types/bcrypt
```

조금 특이한 여석이다\
같은 값이라고 해도 매번 해시를 생성할 때마다 달라지는데\
이러한 하위의 규칙을 가지고 해시값을 생성하기 때문에 서로 다른 해쉬값이라고 해도 검증이 가능하다

```txt
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
 \/ \/ \____________________/\_____________________________/
Alg Cost       Salt                        Hash
```

| 값 | 정보 |
| :-- | :-- |
| 2a |  해시 알고리즘 식별자 (bcrypt) |
|10 | Cost factor (210 ==> 1,024 rounds) |
| N9qo8uLOickgx2ZMRZoMye | 16바이트(128비트) 솔트</br> base64-encoded to 22 characters |
| IjZAgcfl7p92ldGxad68LJZdL17lhWy | 24바이트(192비트) 해시</br> base64-encoded to 31 characters|

사용법은 아래와 같다

```ts
const password = "topSECRET"

const hashedPassword = await bcrypt.hash(password, 10)

bcrypt.compareSync(password, hashedPassword) // true
bcrypt.compareSync("topCOFFEE", hashedPassword) // false
```

이러한 규칙으로 비밀번호를 DB에 저장하여 해쉬값과 비밀번호일치를 확인할 수 있다.
