import { NextResponse } from "next/server";
import convert from "xml-js";

export async function GET(req: Request) {
  const teams = await fetch(`http://ergast.com/api/f1/current/constructors`);
  let text = await teams.text();
  console.log(text);
  try {
    let data = convert.xml2json(text);

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
