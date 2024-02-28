export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | null | undefined> {
  return fetch(input, init).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null;
      payload = await res.json();
    } catch (error: any) {
      throw new Error(`Error fetching ${input}: ${error.message}`);
    }
  });
};
