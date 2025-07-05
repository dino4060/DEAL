

import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";

export default async function Page() {
  const { success, data } = await serverFetch(api.category.getTree());

  const categories = success ? data : [];

  return (
    <>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <br />
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  )
}