import * as React from "react";
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
import "./Template.scss";
import { Menu } from "antd";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactChild;
  activeKey: string;
};

export default function Navigation(props: Props) {
  const { children, activeKey } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  const navigate = useNavigate();

  const toggleNav = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        style={{
          position: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="logo">
          <img
            src="https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4"
            className="brand-logo"
            alt="Northern Breeze"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                navigate("/");
                break;
              case "2":
                navigate("/save");
                break;
              case "4":
                navigate("/subscription");
                break;
              case "7":
                navigate("/profile");
                break;
              case "6":
                localStorage.clear();
                navigate("/login");
                break;
              default:
                break;
            }
          }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Articles
          </Menu.Item>
          <Menu.Item key="2" icon={<SaveOutlined />}>
            Save Articles
          </Menu.Item>
          <Menu.Item key="4" icon={<WalletOutlined />}>
            Subscriptions
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            LogOut
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleNav,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
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

