import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) : 
Promise<NextResponse> =>{
    const query = req.nextUrl.searchParams
    const gender = query.get("gender")
    const birthdate = query.get("birthdate")
    const month = query.get("month");
    const time = query.get("time");

    console.log(gender, birthdate, month, time)
    return NextResponse.json({error: "데이터가 없음"})
}