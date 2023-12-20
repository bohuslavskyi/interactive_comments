import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5357b6",
          colorInfo: "#5357b6",
          colorTextBase: "#334253",
          borderRadius: 8,
          fontSize: 16,
          boxShadow: "",
          boxShadowSecondary: "",
        },
        components: {
          Modal: {
            titleColor: '#334253',
            titleFontSize: 24,
            margin: 32,
            colorText: '#67727E'
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>,
);
