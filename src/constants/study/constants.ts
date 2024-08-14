export type FrequentlyAskType={
    id:number,
    title:string,
    content?:string,
}
export const FrequentlyAsk:FrequentlyAskType[]=[
    {
        id:1,
        title: "토익두잇 레벨시스템이 궁금합니다",
    },
    {
        id:2,
        title: "LC 파트 문제만 소리가 안나와요.",
        content:"PC에서 이용 시 동영상 강의는 정상 재생되나 LC파트 문제만 소리가 나오지 않는 문제가 발생한 경우 아래의 해결 방법을 참고해주세요. || ■ 해결방법 || 다른 브라우저에서 소리 재생 여부 확인 || 웹브라우저 및 PC 재시작 || 사운드 드라이버가 최신버전인지 확인 || 볼륨 음소거 여부 확인 및 재생장치(스피커, 이어폰, etc)를 다른 포트에 연결 || 쿠키/인터넷기록 삭제– 크롬 웹브라우저 재설치"
    },
    {
        id:3,
        title: "토익두잇 결제시스템이 궁금합니다.",
        content:"PC에서 이용 시 동영상 강의는 정상 재생되나 LC파트 문제만 소리가 나오지 않는 문제가 발생한 경우 아래의 해결 방법을 참고해주세요. || ■ 해결방법 || 다른 브라우저에서 소리 재생 여부 확인 || 웹브라우저 및 PC 재시작 || 사운드 드라이버가 최신버전인지 확인 || 볼륨 음소거 여부 확인 및 재생장치(스피커, 이어폰, etc)를 다른 포트에 연결 || 쿠키/인터넷기록 삭제– 크롬 웹브라우저 재설치"
    },
    {
        id:4,
        title: "수준별 연습문제는 사용자의 해당 레벨과 관련된 문제만 풀 수 있나요?",
        content:"사용자의 해당 레벨에 관계없이 사용자의 학습 의향에 따라 학습할 수 있습니다. || ■ 해결방법 || 다른 브라우저에서 소리 재생 여부 확인 || 웹브라우저 및 PC 재시작 || 사운드 드라이버가 최신버전인지 확인 || 볼륨 음소거 여부 확인 및 재생장치(스피커, 이어폰, etc)를 다른 포트에 연결 || 쿠키/인터넷기록 삭제– 크롬 웹브라우저 재설치"
    },
    {
        id:5,
        title: "토익두잇 채팅 기능이 궁금합니다.",
        content:"PC에서 이용 시 동영상 강의는 정상 재생되나 LC파트 문제만 소리가 나오지 않는 문제가 발생한 경우 아래의 해결 방법을 참고해주세요. || ■ 해결방법 || 다른 브라우저에서 소리 재생 여부 확인 || 웹브라우저 및 PC 재시작 || 사운드 드라이버가 최신버전인지 확인 || 볼륨 음소거 여부 확인 및 재생장치(스피커, 이어폰, etc)를 다른 포트에 연결 || 쿠키/인터넷기록 삭제– 크롬 웹브라우저 재설치"
    },
];

export type StudyRecipe1Type={
    id:number,
    part:string,
    col1:number,
    col2:number,
    col3:number
}
export const StudyRecipe1:StudyRecipe1Type[]=[
    {
        id: 0,
        part: "PART1",
        col1: 20,
        col2: 29,
        col3: 40
    },
    {
        id: 1,
        part: "PART2",
        col1: 27,
        col2: 49,
        col3: 71
    },
    {
        id: 2,
        part: "PART3",
        col1: 16,
        col2: 26,
        col3: 37
    },
    {
        id: 3,
        part: "PART4",
        col1: 11,
        col2: 18,
        col3: 25
    },
    {
        id: 4,
        part: "PART5",
        col1: 55,
        col2: 132,
        col3: 226
    },
    {
        id: 5,
        part: "PART6",
        col1: 12,
        col2: 24,
        col3: 39
    },
    {
        id: 6,
        part: "PART7",
        col1: 6,
        col2: 10,
        col3: 18
    },
  
];

export type StudyRecipe2Type={
    id:number,
    part:string,
    col1:number,
    col2:number,
    col3:number,
    col4:number,
}
export const StudyRecipe2:StudyRecipe2Type[]=[
    {
        id: 0,
        part: "PART1",
        col1: 33,
        col2: 42,
        col3: 40,
        col4: 43
    },
    {
        id: 1,
        part: "PART2",
        col1: 43,
        col2: 63,
        col3: 76,
        col4: 87
    },
    {
        id: 2,
        part: "PART3",
        col1: 23,
        col2: 35,
        col3: 38,
        col4: 48
    },
    {
        id: 3,
        part: "PART4",
        col1: 14,
        col2: 22,
        col3: 26,
        col4: 35
    },
    {
        id: 4,
        part: "PART5",
        col1: 107,
        col2: 165,
        col3: 236,
        col4: 342
    },
    {
        id: 5,
        part: "PART6",
        col1: 17,
        col2: 32,
        col3: 40,
        col4: 59
    },
    {
        id: 6,
        part: "PART7",
        col1: 7,
        col2: 16,
        col3: 18,
        col4: 27
    },
  
]