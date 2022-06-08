import * as React from "react";
import Table from "antd/es/table";
import Space from "antd/es/space";
import { useNavigate } from 'react-router-dom';
import "./Show.scss";
import { DataSub } from "../../../interface/Subscription.interface";
import { format, parseISO } from "date-fns";
import Button from "../../../components/common/Button";
import Notification from "antd/es/notification";

import Adaptor from "../../../services";

const { Column } = Table;

type Props = {
  subs: DataSub[];
};

export default function Show(props: Props) {
  const { subs } = props;

  // const disableSub = async (token: string, code: string, state: string) => {
  //   try {
  //     switch (state) {
  //       case "active":
  //         {
  //           const response = await Adaptor.disableSubscription(code, token);
  //           if (!response.success) {
  //             Notification.error({
  //               message: response.message,
  //             });
  //           } else {
  //             Notification.success({
  //               message: response.message,
  //             });
  //           }
  //         }
  //         break;
  //       case "non-renewing":
  //         {
  //           const response = await Adaptor.enableSubscription(code, token);
  //           if (!response.success) {
  //             Notification.error({
  //               message: response.message,
  //             });
  //           } else {
  //             Notification.success({
  //               message: response.message,
  //             });
  //           }
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Notification.error({
  //       message: "Something went wrong please try again",
  //     });
  //   }
  // };

  const changeDate = async (code: string) => {};

  const navigate = useNavigate();

  return (
    <Table dataSource={subs}>
      <Column
        title='Subscription Name'
        dataIndex='firstName'
        key='firstName'
        render={(_: any, record: any) => (
          <span>{record.plan.name ? record.plan.name : "CANCELED"}</span>
        )}
      />
      <Column
        title='Fee'
        dataIndex='fee'
        key='amount'
        render={(_: any, record: any) => (
          <span>
            {record.status !== "non-renewing" ? `${record.plan.currency} ${record.amount / 100}` : 'N/A'}
          </span>
        )}
      />
      <Column
        title='Status'
        dataIndex='status'
        key='status'
        render={(_: any, record: any) => (
          <span style={{ color: record.status === "active" ? "green" : "red" }}>
            {record.status}
          </span>
        )}
      />
      <Column
        title='Next Payment'
        dataIndex='next_payment'
        key='next_payment_date'
        render={(_: any, record: any) => (
          <span>
            {record.next_payment_date
              ? format(parseISO(record.next_payment_date), "yyyy-MM-dd")
              : "N/A"}
          </span>
        )}
      />
      <Column
        title='Action'
        key='action'
        render={(_: any, record: any) => (
          <Space size='middle'>
            {record.status !== "non-renewing" && (
              <Button
                onClick={() => {
                  changeDate(record.code);
                }}
              >
                Change date
              </Button>
            )}
            <Button
              onClick={() => {
                navigate('/subscription/create')
              }}
            >
              {record.status !== "active" ? "Create New Subscription" : "Deactivate"}
            </Button>
          </Space>
        )}
      />
    </Table>
  );
}
