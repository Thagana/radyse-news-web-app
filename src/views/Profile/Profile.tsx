import * as React from "react";
import Template from "../Template";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import "./Profile.scss";

import Network from "../../services/index";
import Settings from "../../components/SettingsModal/Settings";
import EmailNotification from "../../components/SettingsModal/EmailNotification/EmailNotification";

export default function Profile() {
  const [settings, setSettings] = React.useState({
    frequency: 0,
    language: "en",
    location: "ZA",
    pushState: 0,
    name: "",
    email_notification: 0,
  });
  const [SERVER_STATE, setServerSate] = React.useState("");
  const [showName, setShowName] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);

  const loadSettings = async () => {
    try {
      setServerSate("LOADING");
      const response = await Network.fetchSettings();
      const { data, success } = response as {
        data: {
          location: string;
          language: string;
          pushState: number;
          frequency: number;
          name: string;
          email_notification: number;
        };
        success: boolean;
      };
      if (success) {
        setSettings(data);
        setServerSate("SUCCESS");
      } else {
        setServerSate("ERROR");
      }
    } catch (error) {
      console.log(error);
      setServerSate("ERROR");
    }
  };

  const handleClick = (type: string) => {
    switch (type) {
      case "SET_NAME":
        handleNameChange();
        break;
      case "SET_EMAIL_NOTIFICATION":
        handleEmailChange();
        break;
      default:
        break;
    }
  };

  const handleNameChange = () => {
    setShowName(true);
  };

  const handleEmailChange = () => {
    setShowEmail(true);
  };

  const handleCancel = () => {
    setShowName(false);
    setShowEmail(false);
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  return (
    <Template activeKey="7">
      <>
        {SERVER_STATE === "LOADING" && (
          <div className='profile'>Loading ...</div>
        )}
        {SERVER_STATE === "ERROR" && <div>ERROR</div>}
        {SERVER_STATE === "SUCCESS" && (
          <div className='profile'>
            <motion.button
              onClick={() => {
                handleClick("SET_NAME");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='card-item'
            >
              <div className='name'>
                Name [{settings.name ? settings.name : "SET NAME"}]
              </div>
              <div className='icon'>
                <ArrowRightOutlined />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                handleClick("SET_LANGUAGE");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='card-item'
            >
              <div className='name'>News Language [{settings.language}]</div>
              <div className='icon'>
                <ArrowRightOutlined />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                handleClick("LOCATION");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='card-item'
            >
              <div className='name'>News Location [{settings.location}]</div>
              <div className='icon'>
                <ArrowRightOutlined />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                handleClick("PUSH_ENABLE");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='card-item'
            >
              <div className='name'>
                Push Enabled [{settings.pushState === 0 ? "FALSE" : "TRUE"}]
              </div>
              <div className='icon'>
                <ArrowRightOutlined />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                handleClick("SET_EMAIL_NOTIFICATION");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='card-item'
            >
              <div className='name'>
                Email Notifications [
                {settings.email_notification ? "ON" : "OFF"}]
              </div>
              <div className='icon'>
                <ArrowRightOutlined />
              </div>
            </motion.button>
            <Settings
              isModalVisible={showName}
              handleCancel={handleCancel}
              name={settings.name}
            />
            <EmailNotification
              isModalVisible={showEmail}
              handleCancel={handleCancel}
              on={settings.email_notification}
            />
          </div>
        )}
      </>
    </Template>
  );
}
