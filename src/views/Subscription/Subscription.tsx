import * as React from "react";
import Notification from "antd/es/notification";
import { useNavigate } from "react-router-dom";
import Template from "../Template";
import { motion } from "framer-motion";

import { DataSub } from "../../interface/Subscription.interface";
import Button from "../../components/common/Button";

import "./Subscription.scss";

import Adaptor from "../../services/index";

export default function Subscription() {
  const [SERVER_STATE, setServerState] = React.useState("IDLE");
  const [subs, setSubs] = React.useState<DataSub>();

  const navigate = useNavigate();

  const fetchSub = async () => {
    try {
      setServerState("LOADING");
      const response = await Adaptor.fetchSubs();
      if (!response.success) {
        Notification.info({
          message: response.message,
        });
      } else {
        const data = response.data;
        console.log(data);
        setSubs(data);

        Notification.success({
          message: response.message,
        });
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

  const handleActivate = async (current: boolean, actual: string) => {
    if (!current) {
      setServerState("LOADING");
      const response = await Adaptor.createTransaction(actual);
      if (!response.success) {
        Notification.error({
          message: response.message,
        });
      } else {
        const { data } = response;

        window.open(data.authorization_url, "blank");

        Notification.error({
          message: response.message,
        });
      }
      setServerState("SUCCESS");
    }
  }

  const handleCancel = async (code: string, token: string) => {
    try {
      const response = await Adaptor.disableSubscription(code, token);
      if (!response.success) {
        Notification.error({
          message: response.message
        })
      } else {
        Notification.success({
          message: response.message
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const processSub = React.useCallback(
    async (reference: string) => {
      try {
        const response = await Adaptor.verifyTransaction(reference);
        if (!response.success) {
          Notification.info({
            message: response.message,
          });
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
    },
    [navigate]
  );

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
        <div className='cardWrap'>
          {SERVER_STATE === "LOADING" && <div>Loading</div>}
          {SERVER_STATE === "ERROR" && <div>Error</div>}
          {SERVER_STATE === "SUCCESS" && (
            <>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className='pricingCard'
              >
                <p className='planName'>Free Access</p>
                <p className='planPriceDescription'>
                  A free access with the basic features
                </p>
                <div className='priceDiv'>$0 monthly</div>
                <p className='whatsIncluded'>What's included:</p>
                <ul>
                  <li>View news article from difference sources</li>
                  <li>Bookmark news for offline viewing</li>
                  <li>Get news based on viewing patterns</li>
                </ul>
                <div>
                  <Button design='primary long' onClick={() => {
                    if (subs) {
                      handleCancel(subs.code, subs.token);
                    }
                  }}>
                    {!subs ?  'Active' : 'Activate Free'}
                  </Button>
                </div>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className='pricingCard'
              >
                <p className='planName'>Intrigued</p>
                <p className='planPriceDescription'>
                  A starter plan for getting up to date with the platform
                </p>
                <div className='priceDiv'>$15 monthly</div>
                <p className='whatsIncluded'>What's included:</p>
                <ul>
                  <li>Up to 4 Email News updates per/day</li>
                  <li>Up to 4 Mobile Push News updates per/day</li>
                  <li>Up to 4 SMS Push News updates per/day</li>
                </ul>
                <div>
                  <Button design='primary long' onClick={() => {
                    const actual = 'Intrigued';
                    const current = subs?.name === 'Intrigued'
                    handleActivate(current, actual);
                  }}>
                    {subs?.name === 'Intrigued' ? 'Active': 'Activate'}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </Template>
  );
}
