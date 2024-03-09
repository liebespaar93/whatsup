/**
 * @note 공개된 사이트의 Route 입니다\
 * Auth인증이 필요하지 않은 Route 입니다
 * @type {string[]}
 */
export const publicRoutes: string[] = [
	"/",
	"/home",
	"/auth/error"
];

/**
 * @note 유져의 관한 Route 입니다\
 * Auth 인증이 필요한 Route 입니다
 * @type {string[]}
 */
export const authRoutes: string[] = [
	"/auth/login",
];

/**
 * @note API 인증일 위해 사용합니다
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * @note 기본적인 로그인 Redirect 입니다
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";

/**
 * @note 회원 정보를 생성하기 위한 Redirect 입니다
 * @type {string}
 */
export const DEFAULT_NEW_VERIFICATION_REDIRECT: string = "/auth/new-verification";

/**
 * @note 회원 이미지를 저장하는 위치입니다
 * @side public
 * @type {string}
 */
export const DEFAULT_USER_IMAGE_DIR: string = "/user/avatars/";

/**
 * @note 회원 이미지를 저장하는 위치입니다
 * @side public
 * @type {string}
 */
export const DEFAULT_API_BASE_URL: string = process.env.API_BASE_URL ?? "http://localhost:3000/";
