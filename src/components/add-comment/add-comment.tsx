import { FC } from "react";
import { Form } from "antd";

import { CommentEctionTypes, IComment } from "../../types/types.ts";
import { Avatar } from "../../modules/user/avatar.tsx";
import { CustomMention } from "../custom-mention/custom-mention.tsx";
import { SubmitButton } from "../submit-btn/submit-btn.tsx";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import { SUBMIT_BTN_COMPONENT_TYPES } from "../../utils/constants.ts";
import { edit, reply, send } from "../../store/features/commentsSlice.ts";
import Flex from "../flex/flex.tsx";

import c from "./add-comment.module.scss";

interface PropType {
  type: CommentEctionTypes;
  commentToEdit?: IComment;
  commentToReply?: IComment;
  setHandleEction?: (val: CommentEctionTypes) => void;
}

export const AddComment: FC<PropType> = (props) => {
  const dispatch = useAppDispatch();
  const { type, commentToEdit, commentToReply, setHandleEction } =
    props;
  const [form] = Form.useForm();
  
  const { currentUser } = useAppSelector(
    (state) => state.commentsData,
  );
  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      switch (type) {
        case "edit":
          if (commentToEdit?.id) {
            dispatch(
              edit({
                commentId: commentToEdit?.id,
                content: values.commentWithMention,
                isReply: !!commentToEdit?.replyingTo,
              }),
            );
            if (setHandleEction) {
              setHandleEction(undefined);
            }
          }
          break;
        case "reply":
          dispatch(
            reply({
              replaingComment: commentToReply as IComment,
              content: values.commentWithMention,
              isReply: !!commentToEdit?.replyingTo,
            }),
          );
          if (setHandleEction) {
            setHandleEction(undefined);
          }
          break;
        case "send":
          {
            dispatch(send({ commentBody: values.commentWithMention }));
            form.setFieldValue("commentWithMention", "");
          }
          break;
      }
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };

  return (
    <Form
      className={c.wrap}
      form={form}
      onFinish={onFinish}
      initialValues={{
        commentWithMention: commentToEdit?.content || "",
      }}
    >
      <Flex
        gap={16}
        direction={type === "edit" ? "column" : "row"}
        className={`${c.addCommentForm} ${type === "edit" && c.edit}`}
      >
        <>
          {type !== "edit" && (
            <Avatar username={currentUser?.username} size={40} />
          )}
          <CustomMention formItemName="commentWithMention" />
          {type && (
            <SubmitButton text={SUBMIT_BTN_COMPONENT_TYPES[type].text} />
          )}
        </>
      </Flex>
    </Form>
  );
};
