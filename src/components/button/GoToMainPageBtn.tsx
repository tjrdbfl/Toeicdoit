'use client';

import Link from "next/link";

const GoToMainPageBtn=()=>{
    return(<>
    <Link href={"/"}
    className="form_submit_btn p-5 text-balance"
    >
    메인 페이지로 돌아가기
    </Link>
    </>);
}
export default GoToMainPageBtn;