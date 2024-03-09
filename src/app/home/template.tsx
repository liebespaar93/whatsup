import { getUserById } from "@/DB/user";
import DefaultHeader from "@/components/\btemplates/DefaultHeader";
import LostNickname from "@/components/auth/lost/LostNickname";
import LostSession from "@/components/auth/lost/LostSession";

export default function Template({ children }: { children: React.ReactNode }) {

	return <div className="w-full h-full flex flex-col">
		<DefaultHeader />
		<LostSession>
			<LostNickname/>
		</LostSession>
		{children}
	</div>
}

