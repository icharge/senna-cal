import Link from 'next/link';
import { Form, Select, InputNumber, Switch, Slider, Button } from 'antd';
import Layout from '../components/Layout';

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker';

import { SmileFilled } from '@ant-design/icons';
import * as BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import dayjs from 'dayjs';

const { Calendar, Views } = BigCalendar;

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(dayjs) // or globalizeLocalizer

const FormItem = Form.Item;
const Option = Select.Option;

const content = {
  marginTop: '100px',
};

const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const IndexPage = () => (
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
            <SmileFilled size={48} strokeWidth={1} />
          </a>
        </Link>

        <p className="mb-0 mt-3 text-disabled">Welcome to the world !</p>

        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={[]}
          // onEventDrop={this.moveEvent}
          resizable
          // onEventResize={this.resizeEvent}
          // onSelectSlot={this.newEvent}
          onDragStart={console.log}
          defaultView={Views.MONTH}
          defaultDate={new Date(2015, 3, 12)}
          popup={true}
          // dragFromOutsideItem={
          //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
          // }
          // onDropFromOutside={this.onDropFromOutside}
          // handleDragStart={this.handleDragStart}
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

export default IndexPage;
