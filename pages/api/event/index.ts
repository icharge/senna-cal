import { NextApiRequest, NextApiResponse } from 'next';
import { sampleEvents } from '../../../utils/sample-data';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    // List
    case 'GET': {
      try {
        const {
          query: { start, end },
        } = req;

        console.debug('List range :', start, end);

        res.status(200).json(sampleEvents);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
      break;
    }

    // Create
    case 'POST': {
      const { body } = req;

      console.debug('Creating event :', body);

      res.status(201).json(body);
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
