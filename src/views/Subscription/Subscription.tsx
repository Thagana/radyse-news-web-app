import * as React from "react";
import Template from "../Template";
import Notification from "antd/es/notification";
import { Subscription as ISubs , DataSub} from "../../interface/Subscription.interface";

import { useNavigate } from "react-router-dom";
import "./Subscription.scss";

import Adaptor from "../../services/index";
import CreateSubscription from "./create";
import Show from "./show/Show";

export default function Subscription() {
  const [SERVER_STATE, setServerState] = React.useState("IDLE");
  const [hasSubs, setHasSubs] = React.useState(false);
  const [subs, setSubs] = React.useState<DataSub[]>([]);

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
        const data = response.data;

        setSubs(data);

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

  const processSub = React.useCallback(async (reference: string) => {
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
  }, [navigate]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");
    if (reference) {
      processSub(reference);
    }
  }, [processSub]);

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
              <Show subs={subs}/>
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
