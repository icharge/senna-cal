import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Select, InputNumber, Switch, Slider, Button } from 'antd';
import Layout from '../components/Layout';

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker';

import { SmileFilled } from '@ant-design/icons';
import * as BigCalendar from 'react-big-calendar';
import { Calendar, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { NextPageContext } from 'next';
import { sampleEvents } from '../utils/sample-data';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const FormItem = Form.Item;
const Option = Select.Option;

const content = {
  marginTop: '100px',
};

const DragAndDropCalendar = withDragAndDrop(Calendar);

const APP_URL = process.env.APP_URL;

export async function getStaticProps(context: NextPageContext) {
  // console.log('events :', sampleEvents);
  // Backend

  const resp = await fetch(`${APP_URL}/api/event`);
  const body = await resp.json();

  return {
    props: { events: body }, // will be passed to the page component as props
  };
}

const IndexPage = (props: any) => {
  useEffect(() => {
    setEvents(props.events);
  }, [JSON.stringify(props.events)]);
  
  const [events, setEvents] = useState([]);
  
  console.debug('event ', events)
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div style={content}>
        <div className="text-center mb-5">
          <Link href="#">
            <a className="logo mr-0">
              <SmileFilled size={48} />
            </a>
          </Link>

          <p className="mb-0 mt-3 text-disabled">Welcome to the world !</p>

          <DragAndDropCalendar
            selectable
            localizer={localizer}
            events={events}
            onEventDrop={console.log}
            resizable
            onEventResize={console.log}
            onSelectSlot={console.log}
            onDragStart={console.log}
            defaultView={Views.MONTH}
            popup={true}
            // dragFromOutsideItem={
            //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
            // }
            // onDropFromOutside={this.onDropFromOutside}
            // handleDragStart={this.handleDragStart}
            style={{ height: 500 }}
          />
        </div>
        <div>
          <Form layout="horizontal">
            <FormItem
              label="Input Number"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <InputNumber
                size="large"
                min={1}
                max={10}
                style={{ width: 100 }}
                defaultValue={3}
                name="inputNumber"
              />
            </FormItem>

            <FormItem
              label="Switch"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Switch defaultChecked name="switch" />
            </FormItem>

            <FormItem
              label="Slider"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Slider defaultValue={70} />
            </FormItem>

            <FormItem
              label="Select"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Select
                size="large"
                defaultValue="lucy"
                style={{ width: 192 }}
                name="select"
              >
                <Option value="jack">jack</Option>
                <Option value="lucy">lucy</Option>
                <Option value="disabled" disabled>
                  disabled
                </Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
            </FormItem>

            <FormItem
              label="DatePicker"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <DatePicker name="startDate" />
            </FormItem>
            <FormItem
              style={{ marginTop: 48 }}
              wrapperCol={{ span: 8, offset: 8 }}
            >
              <Button size="large" type="primary" htmlType="submit">
                OK
              </Button>
              <Button size="large" style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
