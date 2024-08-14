'use client';
import ModifyProfileBtn from "@/components/user-info/ModifyProfileBtn";
import ModifyUserInfo from "@/components/user-info/ModifyUserInfo";
import { PG } from "@/constants/enums/PG";
import { UserDataPublic } from "@/types/UserData";
import Link from "next/link";

const UserInfoContainer = ({ userInfo, subscribe }: {
    userInfo: UserDataPublic | undefined;
    subscribe: boolean
}) => {

    return (<>
        <div className="container_color w-full px-4 flex flex-row gap-x-10">
            <ModifyProfileBtn profile={userInfo?.profile} />
            <div className='flex flex-row gap-x-10 p-4'>
                <ModifyUserInfo
                    email={userInfo?.email}
                    toeicLevel={userInfo?.toeicLevel}
                    name={userInfo?.name}
                    phone={userInfo?.phone} />
                <div className="bg-slate-200 w-1 h-full" />
                <div className="flex flex-col justify-between py-3">
                    <div
                        className="text-black text-lg font-medium"
                    >현재 {userInfo?.name}님의 토익 점수</div>
                    <input
                        id='toeicScore'
                        name='toeicScore'
                        className="form_input"
                        type='text'
                        disabled={true}
                        placeholder={'토익 점수를 입력해주세요.'}
                    />
                </div>
                <div className="bg-slate-200 w-1 h-full" />
                <div className="flex flex-col justify-between py-1">
                    <div
                        className="text-black text-lg font-medium"
                    >현재 {userInfo?.name}님의 구독 상태</div>
                    <div className="flex flex-row gap-x-2">
                        <div className="text-black font-semibold text-[15px]">구독상태 : </div>
                        <div className="text-blue-500 font-semibold text-[15px]">{subscribe ? '구독 중' : '미구독'}</div>
                    </div>
                    <Link
                        href={`${PG.PAYMENT}`}
                        className="form_submit_btn">
                        구독하러 가기
                    </Link>
                </div>
            </div>

        </div>

    </>);
}
export default UserInfoContainer;