
export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: "No domain provided" });
  }

  try {
    const response = await fetch(`https://data.similarweb.com/api/v1/data?domain=${domain}`, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // подстраховка
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Fetch failed with ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
