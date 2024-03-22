import dns from "dns/promises"

const string = "myopener.kr"

const ip = await dns.lookup(string)

console.log(ip)