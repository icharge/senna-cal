import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Select, Switch, Button, Modal, Input, DatePicker } from 'antd';
import Layout from '../components/Layout';

import { SmileFilled } from '@ant-design/icons';
import * as BigCalendar from 'react-big-calendar';
import { Calendar, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { NextPageContext } from 'next';
import { convertEvents } from '../utils/converter';
import { CalendarEvent } from '../interfaces';
import TextArea from 'antd/lib/input/TextArea';

const APP_URL = process.env.APP_URL || '';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const FormItem = Form.Item;
const Option = Select.Option;
const DragAndDropCalendar = withDragAndDrop(Calendar);
const { RangePicker } = DatePicker;

// Backend
export async function getStaticProps(context: NextPageContext) {
  // console.log('events :', sampleEvents);

  const resp = await fetch(`${APP_URL}/api/event`);
  const body = await resp.json();

  return {
    props: { events: body }, // will be passed to the page component as props
  };
}

const content = {
  marginTop: '100px',
};

interface IndexPageProps {
  events: CalendarEvent[];
}

const IndexPage = (props: IndexPageProps) => {
  useEffect(() => {
    // need to convert date object before use.
    setEvents(convertEvents(props.events));
  }, [JSON.stringify(props.events)]);

  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>({});

  const [form] = Form.useForm();

  /* const handleChange = (field: string) => (e: any) => {
    console.debug('Handle change :', field, e);
  }; */

  const handleFinishForm = async (e: any) => {
    console.debug('handleFinishForm :', e);

    setConfirmLoading(true);
    let start = e.when[0];
    let end = e.when[1];

    if (e.allDay) {
      start = start.startOf('day');
      end = end.endOf('day');
    }

    delete e.when;
    const requestDto: CalendarEvent = { ...e };
    requestDto.start = start.toISOString();
    requestDto.end = end.toISOString();

    console.debug('request :', requestDto);

    const resp = await fetch(`${APP_URL}/api/event`, {
      method: 'POST',
      body: JSON.stringify(requestDto),
    });

    console.debug('RESP :', resp);

    setOpenModal(false);
    setConfirmLoading(false);
    setSelectedEvent({});
  };

  const handleRangeChange = async (e: any) => {
    console.debug('handleRangeChange :', e);
    const { start, end } = e;

    const query = new URLSearchParams();
    query.set('start', moment(start).toISOString());
    query.set('end', moment(end).add(1, 'day').startOf('day').toISOString());

    const resp = await fetch(`${APP_URL}/api/event?${query.toString()}`,);

    console.debug(resp);
  };

  const handleEventDrop = (e: any) => {
    console.debug('handleEventDrop :', e);
  };

  const handleEventResize = (e: any) => {
    console.debug('handleEventResize :', e);
  };

  const handleSelectEvent = (e: any) => alert(e.title);

  const handleSelectSlot = (e: any) => {
    console.debug('handleSelectSlot :', e);
    setOpenModal(true);
  };

  const handleDragStart = (e: any) => {
    console.debug('handleDragStart :', e);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setOpenModal(false);
    setConfirmLoading(false);
    setSelectedEvent({});
  };

  const handleDateTimeChange = (dates: any, dateStrings: [string, string]) => {
    console.debug('handleDateTimeChange : ', dates, dateStrings);
  };

  // console.debug('event ', events);
  return (
    <Layout title="Senna-Cal">
      {/* <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p> */}
      <div style={content}>
        <div className="text-center mb-5">
          <Link href="#">
            <a className="logo mr-0">
              <SmileFilled size={48} />
            </a>
          </Link>

          <p className="mb-0 mt-3 text-disabled">Senna-Cal</p>

          <DragAndDropCalendar
            resizable={false}
            selectable
            events={events}
            localizer={localizer}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            // onDragStart={handleDragStart}
            onRangeChange={handleRangeChange}
            defaultView={Views.MONTH}
            popup={true}
            // dragFromOutsideItem={
            //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
            // }
            // onDropFromOutside={this.onDropFromOutside}
            // handleDragStart={this.handleDragStart}
            style={{ height: 500 }}
          />
          <Modal
            title="Add new event"
            visible={openModal}
            onOk={handleModalOk}
            confirmLoading={confirmLoading}
            onCancel={handleModalCancel}
            width={600}
          >
            <Form
              form={form}
              layout="horizontal"
              name="control-hooks"
              initialValues={selectedEvent}
              onFinish={handleFinishForm}
            >
              <FormItem
                name="title"
                label="Title"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder=""
                  value={selectedEvent.title}
                  defaultValue={selectedEvent.title}
                  autoComplete="off"
                  disabled={confirmLoading}
                />
              </FormItem>
              <FormItem
                name="allDay"
                label="All day"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 8 }}
                valuePropName="checked"
              >
                <Switch disabled={confirmLoading} />
              </FormItem>
              <FormItem
                noStyle
                shouldUpdate={(prev, curr) => prev.allDay !== curr.allDay}
              >
                {({ getFieldValue }) => (
                  <FormItem
                    name="when"
                    label="When"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <RangePicker
                      ranges={{
                        Today: [moment(), moment()],
                        'This Month': [
                          moment().startOf('month'),
                          moment().endOf('month'),
                        ],
                      }}
                      showTime={!getFieldValue('allDay')}
                      // format="YYYY/MM/DD HH:mm:ss"
                      // onChange={handleDateTimeChange}
                      disabled={confirmLoading}
                    />
                  </FormItem>
                )}
              </FormItem>
              <FormItem
                name="memo"
                label="Memo"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
              >
                <TextArea rows={4} disabled={confirmLoading} />
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
