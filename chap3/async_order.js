const test = async () => {
  const lala = await new Promise((resolve) => setTimeout(() => resolve(3), 1000))
  console.log(1)
  console.log(lala);
  console.log(2);
}

test()