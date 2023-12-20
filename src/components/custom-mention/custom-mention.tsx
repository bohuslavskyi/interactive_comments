import {JSX, useMemo, useState} from "react";
import { Form, Mentions } from "antd";
import { useAppSelector } from "../../store/store.ts";
import {IComment} from "../../types/types.ts";

interface IMention {
  formItemName: string;
  rows?: number;
  placeholder?: string;
  commentToEdit?: IComment
}

export const CustomMention = (props: IMention): JSX.Element => {
  const [commentBody, setCommentBody] = useState<string>("");
  const { placeholder = "Add a comment…", rows = 4, formItemName } = props;
  const { users } = useAppSelector((state) => state.commentsData);

  const options = useMemo(() => {
    return users.map((user) => ({
      value: user.username,
      label: user.username,
    }));
  }, [users]);
  
  return (
    <Form.Item name={formItemName} style={{ width: "100%", marginBottom: 0 }}  rules={[
      {
        required: true,
        message: '',
      },
    ]}>
      <Mentions
        rows={rows}
        placeholder={placeholder}
        options={options}
        value={commentBody}
        onChange={setCommentBody}
      />
    </Form.Item>
  );
};
