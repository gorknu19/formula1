export default async function Bingus() {
  await new Promise((resolve, reject) => {
    // Setting 2000 ms time
    setTimeout(resolve, 2000);
  });

  console.log("test");
  let res = await fetch(`https://jsonplaceholder.typicode.com/todos/10`, {
    cache: "no-cache",
  });
  let data = await res.json();
  console.log(data);
  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
