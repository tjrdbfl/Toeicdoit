import Link from "next/link";


const RegisterBtn = () => {
    return (<>
        <Link
            href={'/register'}
            className="w-full h-auto py-[2.5%] mt-[3%] flex items-center justify-center p-[1%] rounded-lg common_btn"
            onClick={() => {}}
        >
            <p className="text-xl text-white font-bold">회원가입</p>
        </Link>
    </>);
}
export default RegisterBtn;