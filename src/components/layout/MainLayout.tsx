import { Avatar, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import Sidebar from "./Sidebar";

type HeaderUser = {
  name?: string;
  img?: string;
};

const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser) as unknown as HeaderUser;

  return (
    <div className="font-Inter text-5xl">
      <Layout
        style={{
          height: "100vh",

          overflow: "hidden",
        }}
      >
        <Sidebar />
        <Layout>
          <Header
            style={{
              backgroundColor: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingInline: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Avatar
                src={user?.img}
                size={40}
                style={{ backgroundColor: "#3b3b3b" }}
              >
                {user?.name?.slice?.(0, 1) ?? "U"}
              </Avatar>
              <div style={{ lineHeight: 1.1 }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {user?.name ?? "User"}
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "auto",
              height: "calc(100vh - 64px)",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
