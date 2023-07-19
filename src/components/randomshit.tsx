export default async function Bingus() {
  await new Promise((resolve, reject) => {
    // Setting 2000 ms time
    setTimeout(resolve, 2000);
  });

  let res = await fetch(`https://jsonplaceholder.typicode.com/todos/10`, {
    cache: "no-cache",
  });
  let data = await res.json();
  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
