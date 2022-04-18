import * as React from "react";
import Modal from "antd/es/modal";
import Button from "../../common/Button";
import Notification from 'antd/es/notification';

import './Settings.scss';
import Network from "../../../services";

type Props = {
  isModalVisible: boolean;
  handleCancel: () => void;
  name: string;
};

export default function Settings(props: Props) {
  const { isModalVisible, handleCancel, name } = props;
  const fullName = name.split(' ');
  const [firstName, setFirstName] = React.useState(fullName[0]);
  const [lastName, setLastName] = React.useState(fullName[1]);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      setLoading(true);
      event.preventDefault();
      const response = await Network.updateSettings('SET_NAME', { firstName, lastName }) as {
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
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} >
      <div className='modal-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(val) => setFirstName(val.target.value)}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(val) => setLastName(val.target.value)}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <Button design='primary long' type='submit' disabled={!lastName || !firstName}>
              {loading ? 'Loading ...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
