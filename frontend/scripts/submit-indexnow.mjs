const siteUrl = (process.env.SITE_URL || 'https://devstools.app').replace(/\/$/, '');
const indexNowKey = process.env.INDEXNOW_KEY || 'ec4f7de85f644a96acfb2568d92feeaa';
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap request failed with ${sitemapResponse.status}`);
}

const sitemapXml = await sitemapResponse.text();
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const siteHost = new URL(siteUrl).hostname;

if (urlList.length === 0) {
  throw new Error('Sitemap contains no URLs');
}

if (urlList.some((url) => new URL(url).hostname !== siteHost)) {
  throw new Error('Sitemap contains URLs outside the configured host');
}

const keyResponse = await fetch(keyLocation);
const publishedKey = (await keyResponse.text()).trim();
if (!keyResponse.ok || publishedKey !== indexNowKey) {
  throw new Error(`IndexNow key verification failed at ${keyLocation}`);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: siteHost,
    key: indexNowKey,
    keyLocation,
    urlList,
  }),
});

const responseBody = await response.text();
console.log(JSON.stringify({
  submittedAt: new Date().toISOString(),
  endpoint: 'https://api.indexnow.org/indexnow',
  status: response.status,
  urlCount: urlList.length,
  keyLocation,
  responseBody,
}, null, 2));

if (![200, 202].includes(response.status)) {
  process.exitCode = 1;
}
