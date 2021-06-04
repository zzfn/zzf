import { NextApiHandler } from 'next';
import { lastUpdated } from 'api/article';

const Hello: NextApiHandler = async (req, res) => {
  const { data } = await lastUpdated();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default Hello;
