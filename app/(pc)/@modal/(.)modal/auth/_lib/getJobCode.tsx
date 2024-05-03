import {QueryFunction} from "@tanstack/query-core";
interface Item {
  bnSeq: number;
}
export const getJobCode = async ({ queryKey }: { queryKey: [string ]}) => {
  const [_1] = queryKey;
  const res = await fetch(`/api/pc/jojik/job-code`, {
    next: {
      tags: ["jobCode"],
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