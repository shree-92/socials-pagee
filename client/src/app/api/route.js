export default async function GET(req, res) {
    try {
      const result = await someAsyncOperation()
      res.status(200).json({ result })
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }
  }