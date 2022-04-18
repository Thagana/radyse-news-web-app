import * as React from 'react'
import Switch from 'antd/es/switch';
import Modal from "antd/es/modal";
import Notification from 'antd/es/notification';

import Network from '../../../services/index';
import Button from '../../common/Button';

type Props = {
  isModalVisible: boolean;
  handleCancel: () => void;
  on: number;
}

export default function EmailNotification(props: Props) {
  const { isModalVisible, handleCancel, on } = props;
  const state = on ? true : false; 
  const [notification, setNotification] = React.useState(state);
  const [loading, setLoading] = React.useState(false);
  const toggle = async (val: boolean) => {
        setNotification(val);
  }

  const update = async () => {
    try {
      setLoading(true);
      const response = await Network.updateSettings('SET_EMAIL_NOTIFICATION', { state: notification }) as {
        success: boolean,
        message: string,
      };
      if (!response.success) {
        Notification.error({
          message: 'Something went wrong'
        })
      } else {
        Notification.success({
          message: response.message
        })
        handleCancel()
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Notification.error({
        message: 'Something went wrong'
      })
      setLoading(false);
    }
  }

  return (
    <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} centered={true}>
      <div className='modal-container'>
        <div className='switch-container'>
         EMAIL NOTIFICATION: ({notification ? 'ON': 'OFF'}) <Switch checked={notification} onChange={toggle} />
        </div>
        <div className='py-2'>
          <Button design='primary long' onClick={update}>
            {loading ? 'Loading ...' : 'UPDATE'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
