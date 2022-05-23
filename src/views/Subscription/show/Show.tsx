import * as React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import "./Show.scss";

type IProps = {
  name: string;
  amount: number;
  start: number;
  end: string;
  status: string;
};
/**
 *
 * @param props
 * @returns JSX
 */
export default function Show(props: IProps) {
  const { name, amount, start, end, status } = props;
  return (
    <div className='subscription-card'>
      <div className='card-subs'>
        <div className='body'>
          <div className='header'>{name}</div>
          <div className='price'>R{amount / 100}</div>
          <div className='start'>
            {" "}
            <CalendarOutlined />{" "}
            <div>{new Date(start * 1000).toUTCString()}</div>
          </div>
          <div className='space'> - </div>
          <div className='end'>
            {" "}
            <CalendarOutlined /> <div>{new Date(end).toUTCString()}</div>
          </div>
          <div className='status'>{status}</div>
        </div>
      </div>
    </div>
  );
}
