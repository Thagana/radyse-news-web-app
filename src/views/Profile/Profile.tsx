import * as React from "react";
import Template from "../Template";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import "./Profile.scss";

import Network from "../../services/index";

export default function Profile() {
  const [settings, setSettings] = React.useState({ frequency: 0, language: 'en', location: 'ZA', pushState: 0 })
  const loadSettings = async () => {
    try {
      const response = await Network.fetchSettings();
      const { data, success } = response as {
        data: { location: string; language: string; pushState: number, frequency: number };
        success: boolean;
      };
      if (success) {
        setSettings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {};

  React.useEffect(() => {
    loadSettings();
  }, []);

  return (
    <Template>
      <div className='profile'>
        <motion.button
          onClick={handleClick}
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
          onClick={handleClick}
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
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='card-item'
        >
          <div className='name'>Push Enabled [{settings.pushState === 0 ? 'FALSE' : 'TRUE'}]</div>
          <div className='icon'>
            <ArrowRightOutlined />
          </div>
        </motion.button>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='card-item'
        >
          <div className='name'>Email Notifications [FALSE]</div>
          <div className='icon'>
            <ArrowRightOutlined />
          </div>
        </motion.button>

      </div>
    </Template>
  );
}
