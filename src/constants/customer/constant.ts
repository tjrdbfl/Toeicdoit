export interface CustomerFAQPartType {
  label: string;
  id: number;
}

export const CustomerFAQPart: CustomerFAQPartType[] = [
  { label: "전체", id: 1 },
  { label: "회원 정보", id: 2 },
  { label: "결제 및 환불", id: 3 },
  { label: "학습 콘텐츠", id:4 },
  { label: "사이트 이용관련/기타", id: 5 },
];
