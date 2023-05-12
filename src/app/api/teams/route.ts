export async function GET(req: Request) {
  const teams = fetch(`http://ergast.com/api/f1/2023/constructorStandings`);
  console.log(teams);
  return teams;
}
