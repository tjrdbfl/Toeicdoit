type RealTestColumnsType = {
    "id": number;
    "title": string;
    "order": boolean;
}
export const RealTestColumns: RealTestColumnsType[] = [
    {
        id: 0,
        title: "id",
        order: true,
    },
    {
        id: 1,
        title: "기출 문제",
        order: false,
    },
    {
        id: 2,
        title: "응시 여부",
        order: false,
    },
];
type RealTestContentType = {
    "id": number;
    "title": string;
    "take": boolean;
}
export const RealTestContent: RealTestContentType[] = [
    {
        id: 1,
        title: "2024년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 2,
        title: "2024년도 2차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 3,
        title: "2023년도 7차 모의고사 기출 문제",
        take: true,
    },
    {
        id: 4,
        title: "2022년도 7차 모의고사 기출 문제",
        take: true,
    },
    {
        id: 5,
        title: "2021년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 6,
        title: "2024년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 7,
        title: "2024년도 2차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 8,
        title: "2023년도 7차 모의고사 기출 문제",
        take: true,
    },
    {
        id: 9,
        title: "2022년도 7차 모의고사 기출 문제",
        take: true,
    },
    {
        id: 10,
        title: "2021년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 11,
        title: "2021년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 12,
        title: "2021년도 8차 모의고사 기출 문제",
        take: false,
    },
    {
        id: 13,
        title: "2021년도 8차 모의고사 기출 문제",
        take: false,
    },
];
type InquiryColumnsType = {
    "id": number;
    "title": string;
    "order": boolean;
}
export const InquiryColumns: InquiryColumnsType[] = [
    {
        id: 0,
        title: "id",
        order: true,
    },
    {
        id: 1,
        title: "문의 제목",
        order: false,
    },
    {
        id: 2,
        title: "날짜",
        order: true,
    },
    {
        id: 3,
        title: "상태",
        order: false,
    },
];
type InquiryContentType = {
    "id": number;
    "title": string;
    "date": string;
    "state": boolean;
}
export const InquiryContent: InquiryContentType[] = [
    {
        id: 1,
        title: "안녕하세요.. 물어볼게 있어요..",
        date: "2024-02-01",
        state: false
    },
    {
        id: 2,
        title: "안녕하세요.. 물어볼게 있어요..",
        date: "2024-02-01",
        state: true
    },
    {
        id: 3,
        title: "안녕하세요.. 물어볼게 있어요..",
        date: "2024-02-01",
        state: true
    },
    {
        id: 4,
        title: "안녕하세요.. 물어볼게 있어요..",
        date: "2024-02-01",
        state: false
    },
    {
        id: 5,
        title: "안녕하세요.. 물어볼게 있어요..",
        date: "2024-02-01",
        state: false
    },
];
export type MyPageResultType = {
    id: number,
    title: string,
}
export const MyPageResult:MyPageResultType[] = [
    {
        id: 1,
        title: '실전모의고사',
    },
    {
        id: 2,
        title: '수준별 연습문제',
    },
    {
        id: 3,
        title: '파트별 연습문제',
    },
    {
        id: 4,
        title: '레벨테스트',
    },
]
export type MyPageResultContentType = {
    id: number,
    categoryId:number,
    date: Date,
    score: number
};
export const MyPageResultContent:MyPageResultContentType[] = [
    {
        id: 1,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 2,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 3,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 4,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 5,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 6,
        date: new Date(),
        score: 770,
        categoryId: 1
    },
    {
        id: 7,
        date: new Date(),
        score: 770,
        categoryId: 2
    },
    {
        id: 8,
        date: new Date(),
        score: 770,
        categoryId: 2
    },
    {
        id: 9,
        date: new Date(),
        score: 770,
        categoryId: 2
    },
    {
        id: 10,
        date: new Date(),
        score: 770,
        categoryId: 3
    },
    {
        id: 11,
        date: new Date(),
        score: 770,
        categoryId: 3
    },
    {
        id: 12,
        date: new Date(),
        score: 770,
        categoryId: 3
    },
    {
        id: 13,
        date: new Date(),
        score: 770,
        categoryId: 3
    },
    {
        id: 14,
        date: new Date(),
        score: 770,
        categoryId: 3
    },
    {
        id: 15,
        date: new Date(),
        score: 770,
        categoryId: 3
    },

]

