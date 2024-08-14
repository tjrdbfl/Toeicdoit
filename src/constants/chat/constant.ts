export type chatCategoryType = {
    id: number;
    title: string;
    category: 'ALL'|'STUDY' | 'FREE' | 'WORK' | 'UNI' | 'SEEK' |'ETC'
}
export const chatCategory: chatCategoryType[] = [
    {
        id: 0,
        title: "전체",
        category: "ALL"
    },
    {
        id: 1,
        title: "스터디 모집",
        category: "STUDY"
    },
    {
        id: 2,
        title: "수다방",
        category: "FREE"
    },
    {
        id: 3,
        title: "대학생",
        category: "UNI"
    },
    {
        id: 4,
        title: "회사원",
        category: "WORK"
    },
    {
        id: 5,
        title: "취준생",
        category: "SEEK"
    },
    {
        id: 6,
        title: "기타",
        category: "ETC"
    },
]
export type ChatOptionType = {
    id: number;
    title: string;
    message: string
}
export const block: ChatOptionType[] = [
    {
        id: 1,
        title: '퇴출',
        message: `해당 채팅방에서 나가게 됩니다. 다시 초대를 받으면 재입장 가능합니다. 퇴출된 사용자는 방 우측 상단에 배너에서 차단 리스트를 통해 관리할 수 있습니다.`
    },
    {
        id: 2,
        title: '차단',
        message: "상대방의 메시지가 보이지 않게 됩니다. 차단 해제 전까지 해당 채팅방에서 상대방과 대화할 수 없습니다. 차단 해제는 방 우측 상단에 서랍을 통해 가능합니다."
    },
    {
        id: 3,
        title: '차단 및 퇴출',
        message: "해당 멤버는 차단 및 퇴출 시 채팅방에서 나가짐과 동시에 상대방의 메세지가 보이지 않게 됩니다. 차단 해제 전까지 채팅방에서 상대방과 대화할 수 없습니다. "
    },
];
export const drawer: ChatOptionType[] = [
    {
        id: 1,
        title: "채팅방 나가기",
        message: "채팅방을 나가시겠어요? || 대화내용이 모두 삭제되고 복원이 불가능합니다."
    },
    {
        id: 2,
        title: "대화상대 보기",
        message: ""
    },
];