import {QueryFunction} from "@tanstack/query-core";
interface Item {
  sawonCode: number;
}
export const getItem = async ({ queryKey }: { queryKey: [string, string ]}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`/api/pc/auth-view?sawonCode=${id}`, {
    next: {
      tags: ["authLoad", id],
    },
    credentials: 'include',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}