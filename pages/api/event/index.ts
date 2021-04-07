import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import initializeDatabase from '../../../database';
import { EventEntity } from '../../../entity/event.entity';

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
      const start = new Date(bodyJs.start);
      const end = new Date(bodyJs.end);

      const event = new EventEntity();
      event.allDay = bodyJs.allDay || false;
      event.title = bodyJs.title || '';
      event.memo = bodyJs.memo || '';
      event.start = start;
      event.end = end;

      console.debug('before save :', event);

      const savedEvent = await eventRepo.save(event);

      console.debug('Saved event :', savedEvent);

      if (bodyJs.repeat) {
        let startMoment = moment(start);
        let endMoment = moment(end);
        for (let idx = 0; idx < bodyJs.repeatCount; idx++) {
          const repeatEvent = new EventEntity();
          repeatEvent.allDay = bodyJs.allDay || false;
          repeatEvent.title = bodyJs.title || '';
          repeatEvent.memo = bodyJs.memo || '';

          startMoment = startMoment.add(1, bodyJs.repeatType);
          endMoment = endMoment.add(1, bodyJs.repeatType);
          repeatEvent.start = startMoment.toDate();
          repeatEvent.end = endMoment.toDate();

          await eventRepo.save(repeatEvent);
        }
      }

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
