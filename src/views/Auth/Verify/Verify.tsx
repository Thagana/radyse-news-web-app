import * as React from 'react'
import Notification from 'antd/es/notification';
import { useNavigate } from 'react-router-dom';

import Network from '../../../services/index';
import Button from '../../../components/common/Button';

import './Verify.scss';

export default function Verify() {
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      setLoading(true);
      event.preventDefault();
      const response = await Network.verifyCode(code) as {
        success: boolean,
        token: string
      };
      if (response.success) {
        // push to verify
        Notification.open({
          message: 'Success',
          description: 'Successfully verified'
        });
        const token = response.token
        localStorage.setItem('authToken', token);
        navigate('/');
      } else {
        // show error message
        Notification.open({
          message: 'Error',
          description:
            'Sign In failed'
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Notification.open({
        message: 'Error',
        description:
          'Something Went wrong please try again later'
      });
      setLoading(true);
    }
  }
  return (
    <div className='verify-container'>
       <div className='form-container'>
        <div className='image-container'>
          <img src='https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4' className='image' alt="Ultimate News" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input className='form-control' placeholder='Enter OTP code' value={code} onChange={(val) => setCode(val.target.value)} />
          </div>
          <div className='form-group'>
            <Button type='submit' design='primary long' disabled={!code} >
              {loading ? 'LOADING ...' : 'SUBMIT'}
            </Button>
          </div>
        </form>
        <div className='link-container'>
          <a href='/login'>Sign In</a>
        </div>
      </div>
    </div>
  )
}
