import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  console.log("Connected to redis client");

  while (1) {
    try {
      const res = await client.brPop("submissions", 0);
      console.log(res);
      await new Promise((resolve) => setInterval(resolve, 5000));
      console.log("processed user submission");
    } catch (error) {
      console.error("Error", error);
    }
  }
}
main();
