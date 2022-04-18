import * as React from "react";
import Template from "../Template";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import "./Profile.scss";

import Network from "../../services/index";
import Settings from "../../components/SettingsModal/Settings";

export default function Profile() {
  const [settings, setSettings] = React.useState({
    frequency: 0,
    language: "en",
    location: "ZA",
    pushState: 0,
    name: ''
  });

  const [showName, setShowName] = React.useState(false);
  const [showPushState, setShowPushState] = React.useState(false);
  const [showLocation, setShowLocation] = React.useState(false);


  const loadSettings = async () => {
    try {
      const response = await Network.fetchSettings();
      const { data, success } = response as {
        data: {
          location: string;
          language: string;
          pushState: number;
          frequency: number;
          name: string;
        };
        success: boolean;
      };
      if (success) {
        setSettings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (type: string) => {
    switch (type) {
      case 'SET_NAME':
        handleNameChange();
        break;
    
      default:
        break;
    }
  };

  const handleNameChange = () => {
    setShowName(true);
  }

  const handleCancel = () => {
    setShowName(false);
  }

  React.useEffect(() => {
    loadSettings();
  }, []);

  return (
    <Template>
      <div className='profile'>
        <motion.button
          onClick={() => {
            handleClick('SET_NAME');
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='card-item'
        >
          <div className='name'>Name [{settings.name ? settings.name : 'SET NAME'}]</div>
          <div className='icon'>
            <ArrowRightOutlined />
          </div>
        </motion.button>
        <motion.button
          onClick={() => {
            handleClick('SET_LANGUAGE')
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
            handleClick('LOCATION')
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
            handleClick('PUSH_ENABLE')
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
            handleClick('SET_EMAIL_NOTIFICATION')
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='card-item'
        >
          <div className='name'>Email Notifications [FALSE]</div>
          <div className='icon'>
            <ArrowRightOutlined />
          </div>
        </motion.button>
        <Settings isModalVisible={showName} handleCancel={handleCancel} name={settings.name} />
      </div>
    </Template>
  );
}
