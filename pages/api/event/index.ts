import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import initializeDatabase from '../../../database';
import { EventEntity } from '../../../entity/event.entity';
import { sampleEvents } from '../../../utils/sample-data';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase();
  const eventRepo = await getRepository(EventEntity);

  const { method } = req;

  switch (method) {
    // List
    case 'GET': {
      try {
        const {
          query: { start, end },
        } = req;

        console.debug('REQ range :', start, end);

        const events = await eventRepo.find();
        console.debug(' events :', events);

        // res.status(200).json(sampleEvents);
        res.status(200).json(events);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
      break;
    }

    // Create
    case 'POST': {
      const { body } = req;

      const bodyJs = JSON.parse(body);

      console.debug('Creating event :', bodyJs);

      const event = new EventEntity();
      event.allDay = bodyJs.allDay || false;
      event.title = bodyJs.title || '';
      event.memo = bodyJs.memo || '';
      event.start = new Date(bodyJs.start);
      event.end = new Date(bodyJs.end);

      console.debug('before save :', event);

      const savedEvent = await eventRepo.save(event);

      console.debug('Saved event :', savedEvent);

      res.status(201).json(savedEvent);
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} not allowed`);
  }

  await connection.close();
};

export default handler;
