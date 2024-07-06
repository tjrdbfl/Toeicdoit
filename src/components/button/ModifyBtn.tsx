"use client";

import { PG } from "@/constants/enums/PG";
import { useRouter } from "next/navigation";

export default function ModifyBtn({ id }: { id: number }) {

    const router = useRouter();

    return (<>
        <button
            onClick={() => {router.push(`${PG.FREE}/modify/${id}`);}}
            className="form_submit_btn"
        >
            수정
        </button>
    </>);

}