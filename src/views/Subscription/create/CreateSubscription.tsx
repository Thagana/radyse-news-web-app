import * as React from "react";
import { motion } from "framer-motion";
import Button from "../../../components/common/Button";
import Notification from "antd/es/notification";

import Adaptor from "../../../services";

import "./CreateSubscription.scss";

export default function CreateSubscription() {
  const [SERVER_STATE, setServerState] = React.useState("IDLE");
  const handleClick = async (type: string) => {
    try {
      setServerState("LOADING");
      const response = await Adaptor.createTransaction("Intrigued");
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
    } catch (error) {
      console.log(error);
      setServerState("ERROR");
    }
  };
  return (
    <div className='subscription'>
      <div className='cardWrap'>
        {SERVER_STATE === "LOADING" && <div>Loading</div>}
        {SERVER_STATE === "ERROR" && <div>Error</div>}
        {SERVER_STATE === "IDLE" && (
          <>
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
              <div className='priceDiv'>$2 monthly</div>
              <p className='whatsIncluded'>What's included:</p>
              <ul>
                <li>Up to 2 Email News updates per/day</li>
                <li>Up to 2 Mobile Push News updates per/day</li>
                <li>Up to 2 SMS Push News updates per/day</li>
              </ul>
              <div>
                <Button
                  design='primary long'
                  onClick={() => {
                    handleClick("Intrigued");
                  }}
                >
                  Subscribe
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
              <p className='planName'>Fanatic</p>
              <p className='planPriceDescription'>
                More features than the Intrigued plan
              </p>
              <div className='priceDiv'>$ 3 monthly</div>
              <p className='whatsIncluded'>What's included:</p>
              <ul>
                <li>Up to 4 Mobile Push News updates per/day</li>
                <li>Up to 4 SMS Push News updates per/day</li>
                <li>News Analytics (Compare news articles)</li>
              </ul>
              <div>
                <Button
                  design='primary long'
                  onClick={() => {
                    handleClick("Fanatic");
                  }}
                >
                  Subscribe
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
              <p className='planName'>In The Know</p>
              <p className='planPriceDescription'>
                All plus News Settings and Analytics
              </p>
              <div className='priceDiv'>$ 10 monthly</div>
              <p className='whatsIncluded'>What's included:</p>
              <ul>
                <li>Email Notification as they come</li>
                <li>SMS Notification as they come</li>
                <li>Mobile Push Notification as they come</li>
                <li>Get News Analytics</li>
              </ul>
              <div>
                <Button
                  design='primary long'
                  onClick={() => {
                    handleClick("In The Know");
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
