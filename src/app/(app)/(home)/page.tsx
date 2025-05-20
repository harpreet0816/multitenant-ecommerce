import configPromise from "@payload-config";
import { getPayload } from "payload";

// /admin for cms
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
