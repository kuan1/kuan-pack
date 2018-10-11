async function test() {
  const a = await Promise.resolve(0)
  console.log(a)
}

test()