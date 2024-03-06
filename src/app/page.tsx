import { Button } from "@/components/ui/button";
import LoginModalButton from "@/components/auth/LoginModalButton";

export default async function Home() {
	return (
		<main className="flex h-full flex-col item-center justify-center
		bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-50">
			<div className="p-10">
				<h1>여기는 로그인 확인 창입니다</h1>
				{/* {0? (
					<h1>You are In</h1>
				): (
					<Button><Link href="/auth" >Need Login</Link></Button>
				)} */}
				<LoginModalButton>
					<Button>login</Button>
				</LoginModalButton>
			</div>
		</main>
	);
}
