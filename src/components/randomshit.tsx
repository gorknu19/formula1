export default async function Bingus() {
  await new Promise((resolve, reject) => {
    // Setting 2000 ms time
    setTimeout(resolve, 2000);
  });

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
