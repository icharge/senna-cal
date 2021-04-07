import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import initializeDatabase from '../../../database';
import { EventEntity } from '../../../entity/event.entity';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase();
  const eventRepo = await getRepository(EventEntity);

  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'POST': {
      console.debug('updating id ', id);

      if (!id) {
        await connection.close();
        return res.status(404).end(`Require event ID ${id}`);
      }

      const event = await eventRepo.findOne(+id);
      if (!event) {
        await connection.close();
        return res.status(500).end(`Not found event ID ${id}`);
      }

      const { body } = req;

      const bodyJs = JSON.parse(body);
      event.allDay = bodyJs.allDay || false;
      event.title = bodyJs.title || '';
      event.memo = bodyJs.memo || '';
      event.start = new Date(bodyJs.start);
      event.end = new Date(bodyJs.end);

      eventRepo.save(event);

      const savedEvent = await eventRepo.save(event);

      console.debug('Saved event :', savedEvent);

      res.status(201).json(savedEvent);

      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} not allowed`);
  }

  await connection.close();
};

export default handler;
