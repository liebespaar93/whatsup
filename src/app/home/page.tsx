import { Button } from "@/components/ui/button";
import DeviceInfo from "@/lib/auth/DeviceInfo";
import { LogNote } from "@/lib/server/Logger";

export default async function Home() {
	return (
		<div className="p-10">
			<h1>홈 페이지</h1>
			<Button onClick={DeviceInfo}>device</Button>
		</div>
	);
}
