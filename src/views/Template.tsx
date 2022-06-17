import * as React from "react";
import Menu from "antd/es/menu";
import { useNavigate } from "react-router-dom";
import Layout from "antd/es/layout";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { TabBar } from "antd-mobile";
import "./Template.scss";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactChild;
  activeKey: string;
};

export default function Navigation(props: Props) {
  const { children, activeKey } = props;
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setOnline] = React.useState(true);
  const [show, setShow] = React.useState(true);
  
  const navigate = useNavigate();

  const toggleNav = () => {
    setCollapsed(!collapsed);
  };

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });


  React.useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  if (!isOnline) {
    return (
      <div className='offline-container'>
        <span>Your offline, no internet connection</span>
      </div>
    );
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='sider'
        style={{
          position: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className='logo'>
          <img
            src='https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4'
            className='brand-logo'
            alt='Northern Breeze'
          />
        </div>
        <Menu theme='dark' mode='inline' selectedKeys={[activeKey]}>
          <Menu.Item
            key='1'
            icon={<HomeOutlined />}
            onClick={() => {
              navigate("/");
            }}
          >
            Articles
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<SaveOutlined />}
            onClick={() => {
              navigate("/save");
            }}
          >
            Save Articles
          </Menu.Item>
          <Menu.Item
            key='4'
            icon={<WalletOutlined />}
            onClick={() => {
              navigate("/subscription");
            }}
          >
            Subscriptions
          </Menu.Item>
          <Menu.Item
            key='7'
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key='6'
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            LogOut
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {show && React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleNav,
            }
          )}
          {!show && React.createElement(() => (
            <>
              <TabBar>
                <TabBar.Item key='home' icon={<HomeOutlined />} title='Home' />
                <TabBar.Item key='save' icon={<SaveOutlined />} title='Save' />
                <TabBar.Item
                  key='subscription'
                  icon={<WalletOutlined />}
                  title='Subscription'
                />
                <TabBar.Item
                  key='profile'
                  icon={<UserOutlined />}
                  title='Profile'
                />
              </TabBar>
            </>
          ), {
            className: "bottom-nav",
          })}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: "1rem 2rem 0rem 15rem",
            padding: 24,
            minHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
