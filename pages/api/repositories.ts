// commenting this out because it's causing a type error
// import { fetchRepositories } from '@huchenme/github-trending/lib/scrape';
import { fetchRepositories } from '@huchenme/github-trending';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const language = req.query.language as string;
  // Not working now
  // I thought this function interfaced directly with the function
  // that scrapes the data. Instead it calls github-trending's server
  // that hosts the API, which is currently down. I'll use another API for
  // now and leave this here should I need to replace it later.
  res.setHeader('Cache-Control', 's-maxage=86400');
  const response = await fetchRepositories({ language, since: 'daily' });
  res.json(response);
  res.end();
};
