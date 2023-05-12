import { NextResponse } from "next/server";
import convert from "xml-js";

export async function GET(req: Request) {
  const calender = await fetch(`http://ergast.com/api/f1/current/constructors`);
  let text = await calender.text();
  console.log(text);
  try {
    //@ts-ignore
    let data = convert.xml2json(text);

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
