"use client";
import { SERVER } from "@/constants/enums/API";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


const GoogleAuthBtn = () => {
    const router = useRouter();
    const handleClick = async () => {
        router.push(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`);

        const response = fetch(`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://localhost:3000/redirectCode&scope=https://www.googleapis.com/auth/indexing&response_type=code
  `, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(JSON.stringify(response));

    }

    return (<>
        <button
            type="submit"
            className="w-full h-auto mt-[3%] mb-[5%] flex items-center justify-center p-[1%] py-[2.5%] shadow-md border-gray-100 border-[1px] rounded-lg hover:bg-slate-50 hover:transition-all hover:border-2 hover:duration-75 "
            onClick={handleClick}
        >
            <FcGoogle className="h-[50%] w-[6%] mr-[5%]" />
            <p className="text-xl text-slate-500 font-bold ">구글 계정으로 시작</p>
        </button>
    </>);
}
export default GoogleAuthBtn;