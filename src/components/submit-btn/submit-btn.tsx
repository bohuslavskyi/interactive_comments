import { Button } from "antd";

import c from "./submit-btn.module.scss";

type SubmitBtnType = {
  text: string;
  htmlType?: "submit" | "button" | "reset";
  type?: "text" | "primary" | "link" | "default" | "dashed" | undefined;
  size?: "small" | "middle" | "large" | undefined;
  action?: () => void;
};
export const SubmitButton = (props: SubmitBtnType) => {
  const {
    text,
    action = () => {},
    htmlType = "submit",
    type = "primary",
    size = "large",
  } = props;
  return (
    <div className={`${c.buttonSubmit} ${c[text]}`}>
      <Button htmlType={htmlType} type={type} size={size} onClick={action}>
        {text}
      </Button>
    </div>
  );
};
