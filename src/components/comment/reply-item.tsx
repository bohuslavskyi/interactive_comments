import { IComment } from "../../types/types.ts";
import Comment from "./comment.tsx";

const ReplyItem = (props: {
  reply: IComment;
  parentComment: IComment;
  showModal: (id: number | null) => void;
}) => {
  const { parentComment, showModal, reply } = props;
  return (
    <Comment
      comment={reply}
      parentComment={parentComment}
      showModal={showModal}
    />
  );
};
export default ReplyItem;
