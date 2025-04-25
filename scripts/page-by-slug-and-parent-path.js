export default async function handler(request, _context) {
  const slug = request.params.slug ?? "";
  const parentPath = request.params.parentPath ?? "/";
  const PUBLISHER_HOST = 'https://dev.cf.skoda-auto.com'
  const persistedQuery = `test-site/pageBySlugAndParentPath`
  const url = `${PUBLISHER_HOST}/graphql/execute.json/${persistedQuery}%3BparentPath%3D%2Fcontent%2Fdam%2Fskoda-auto-dirk%2F${parentPath}%3Bslug%3D${slug};`
  const res = await fetch(url)

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify({error: "Failed to fetch from AEM", url}),
    };
  }

  const json = await res.json();

  // Add to context for rendering in the HTML
  context.content = {
    json
  };

}
