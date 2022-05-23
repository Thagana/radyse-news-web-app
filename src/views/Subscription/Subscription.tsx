import * as React from "react";
import Template from "../Template";
import Notification from "antd/es/notification";

import { useNavigate } from "react-router-dom";
import "./Subscription.scss";

import Adaptor from "../../services/index";
import CreateSubscription from "./create";
import Show from "./show/Show";

export default function Subscription() {
  const [SERVER_STATE, setServerState] = React.useState("IDLE");
  const [hasSubs, setHasSubs] = React.useState(false);
  const [start, setStart] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [next_payment_date, setNextPayment] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const fetchSub = async () => {
    try {
      setServerState("LOADING");
      const response = await Adaptor.fetchSubs();
      if (!response.success) {
        Notification.info({
          message: response.message,
        });
        setHasSubs(false);
      } else {
        const {
          amount,
          start,
          next_payment_date,
          name,
          status,
        } = response.data;

        setStart(start);
        setAmount(amount);
        setPlan(name);
        setStatus(status);
        setNextPayment(next_payment_date);

        Notification.success({
          message: response.message,
        });
        setHasSubs(true);
      }
      setServerState("SUCCESS");
    } catch (error) {
      console.log("Error", error);
      setServerState("ERROR");
      Notification.error({
        message: "Something went wrong please try again later",
      });
    }
  };

  const processSub = async (reference: string) => {
    try {
      const response = await Adaptor.verifyTransaction(reference);
      if (!response.success) {
        Notification.info({
          message: response.message,
        });
        setHasSubs(false);
      } else {
        Notification.success({
          message: response.message,
        });
        navigate("/subscription");
      }
      setServerState("SUCCESS");
    } catch (error) {
      console.log("Error", error);
      Notification.error({
        message: "Something went wrong please try again later",
      });
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");
    if (reference) {
      processSub(reference);
    }
  }, []);

  React.useEffect(() => {
    fetchSub();
  }, []);

  return (
    <Template activeKey='4'>
      <div className='subscription'>
        {SERVER_STATE === "LOADING" && <div>LOADING</div>}
        {SERVER_STATE === "SUCCESS" && (
          <>
            {hasSubs ? (
              <Show
                amount={amount}
                status={status}
                name={plan}
                start={start}
                end={next_payment_date}
              />
            ) : (
              <CreateSubscription />
            )}
          </>
        )}
        {SERVER_STATE === "ERROR" && <div>ERROR</div>}
      </div>
    </Template>
  );
}
