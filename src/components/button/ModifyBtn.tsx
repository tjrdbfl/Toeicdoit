"use client";

import { useRouter } from "next/navigation";

export default function ModifyBtn({ id }: { id: number }) {

    const router = useRouter();

    return (<>
        <button
            onClick={() => {router.push(`/post/modify/${id}`);}}
            className="form_submit_btn"
        >
            수정
        </button>
    </>);

}