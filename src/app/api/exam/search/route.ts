import { ITEMS_PER_PAGE, ToeicData } from "@/types/ToeicData";
import { NextRequest, NextResponse } from "next/server";

export interface I_ApiExamSearchRequest {
  query: string;
  currentPage: number;
  offset: number;  // db에서 검색할 결과의 index 
}
export interface I_ApiExamSearchResponse {
  success: boolean;
  toeicdata?: ToeicData[];
  message?: string;
}


export async function POST(request: NextRequest) {
  console.log(`3 - POST 경로 : 진입 성공`);
  const body = (await request.json()) as I_ApiExamSearchRequest;

  // trim all string values
  const { query, currentPage, offset } = Object.fromEntries(
    Object.entries(body).map(([key, value]) =>
      [key, typeof value === 'string' ? value.trim() : value]
    )
  ) as I_ApiExamSearchRequest;


  if (!currentPage || !offset) {
    const res: I_ApiExamSearchResponse = {
      success: false,
      message: '알 수 없는 페이지 입니다.'
    }
    return NextResponse.json(res, { status: 400 });
  }

  const token = request.cookies.get('accessToken')?.value;

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/toeic/search`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query: query, currentPage: currentPage, offset: offset }),
    cache: 'no-store'
  })
    .then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        const response = NextResponse.json({ success: true, toeicdata: json.data }, { status: 200 });
        return response;
      }
      else {
        const errorJson = await res.json();
        return NextResponse.json({ success: false, message: errorJson.message }, { status: res.status });
      }

    })
    .catch(async (err) => {
      console.log(err);
      return NextResponse.json({ success: false, message: err }, { status: 500 });
    })

}
