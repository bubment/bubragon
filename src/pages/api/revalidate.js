export default async function handler(req, res) {
    try {
      // Manually revalidate the root path
      await res.revalidate('/');
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  }

