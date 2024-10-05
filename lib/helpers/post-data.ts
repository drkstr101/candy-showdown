export default async function postData(
  url: string | URL | Request,
  data: Record<string, unknown>
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  return res.json();
}
