import {QueryFunction} from "@tanstack/query-core";
interface Item {
  page: number;
}
export const getList: QueryFunction<Item[], [_1: string, _2: string, searchParams: { p: string, q?: string }]>
  = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(`/api/pc/upload-list?${urlSearchParams.toString()}`, {
    next: {
      tags: ['posts', 'search', searchParams.p],
    },
    credentials: 'include',
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}