import RegisterForm from "@/templates/auth/RegisterForm";

export default function RegisterPage() {
    
    return (<>
        <div className="form w-[500px] p-10">
            <p className="form_title">회원가입</p>
            <RegisterForm/>
        </div>
    </>);
}
