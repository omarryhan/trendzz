import { fetchRepositories } from 'github-trending-scrape/lib/scrape';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const language = req.query.language as string;
  const since = req.query.since as string || 'daily';
  res.setHeader('Cache-Control', 's-maxage=86400');
  const response = await fetchRepositories({ language, since });
  res.json(response);
};
