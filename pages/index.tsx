import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Select, Switch, Button, Modal, Input, DatePicker } from 'antd';
import Layout from '../components/Layout';

import { SmileFilled } from '@ant-design/icons';
import * as BigCalendar from 'react-big-calendar';
import { Calendar, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment, { Moment } from 'moment';
import { NextPageContext } from 'next';
import { convertEvents } from '../utils/converter';
import { CalendarEvent } from '../interfaces';
import TextArea from 'antd/lib/input/TextArea';

const APP_URL = process.env.APP_URL;

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

  const handleFinishForm = (e: any) => {
    console.debug('handleFinishForm :', e);
    // TODO: map `when`. (array) into `start`, `end`
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
            resizable
            selectable
            events={events}
            localizer={localizer}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            // onDragStart={handleDragStart}
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
          >
            <Form
              form={form}
              layout="horizontal"
              initialValues={selectedEvent}
              onFinish={handleFinishForm}
            >
              <FormItem
                name="title"
                label="Title"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  placeholder=""
                  value={selectedEvent.title}
                  defaultValue={selectedEvent.title}
                />
              </FormItem>
              <FormItem
                name="allDay"
                label="All day"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                valuePropName="checked"
              >
                <Switch />
              </FormItem>
              <FormItem
                name="when"
                label="When"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [
                      moment().startOf('month'),
                      moment().endOf('month'),
                    ],
                  }}
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  // onChange={handleDateTimeChange}
                />
              </FormItem>
              <FormItem
                name="memo"
                label="Memo"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <TextArea rows={4} />
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
