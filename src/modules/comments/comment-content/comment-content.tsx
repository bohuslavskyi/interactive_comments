import { JSX } from "react";
import { Avatar } from "../../user/avatar.tsx";
import IconDelete from "../../../assets/icon-delete.tsx";
import IconEdit from "../../../assets/icon-edit.tsx";
import IconReply from "../../../assets/icon-reply.tsx";
import { ICommentProps } from "../../../types/types.ts";
import { Score } from "../score/score.tsx";
import { AddComment } from "../../../components/add-comment/add-comment.tsx";
import Flex from "../../../components/flex/flex.tsx";
import {useAppSelector} from "../../../store/store.ts";

import c from "./comment-content.module.scss";

export const CommentContent = (props: ICommentProps): JSX.Element => {
  const {
    comment,
    isActionsVisible,
    handleEction,
    setHandleEction,
    showModal,
  } = props;
  
  const { currentUser } = useAppSelector(
    (state) => state.commentsData,
  );

  const { id, content, createdAt, score, user, replyingTo = "" } = comment;
  const isYou = user.userId === currentUser.userId;

  return (
    <Flex gap={24} className={c.commentContentWrap}>
      <>
        <Score score={score} commentId={id} replyingTo={replyingTo} />
        <Flex direction="column" gap={15} className={c.commentContent}>
          <>
            <Flex
              justify="space-between"
              alignItems="center"
              className={c.commentHeader}
            >
              <>
                <Flex alignItems="center" gap={14}>
                  <>
                    <Avatar username={user.username} />
                    <Flex className={c.userName} alignItems="center" gap={8}>
                      <>
                        <p>{user.username}</p>
                        {isYou && <span className={c.you}>you</span>}
                      </>
                    </Flex>
                    <p className={c.createdAt}>{createdAt}</p>
                  </>
                </Flex>
                <Flex
                  gap={12}
                  className={`${c.commentActions} ${
                    isActionsVisible && c.visible
                  }`}
                >
                  {isYou ? (
                    <>
                      <button
                        type="button"
                        className={c.delete}
                        onClick={() => showModal(comment.id)}
                      >
                        <IconDelete />
                        <span>Delete</span>
                      </button>
                      <button
                        type="button"
                        className={c.edit}
                        onClick={() => setHandleEction("edit")}
                      >
                        <IconEdit />
                        <span>Edit</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className={c.reply}
                      onClick={() => setHandleEction("reply")}
                    >
                      <IconReply />
                      <span>Reply</span>
                    </button>
                  )}
                </Flex>
              </>
            </Flex>

            {handleEction === "edit" ? (
              <AddComment
                type={handleEction}
                commentToEdit={comment}
                setHandleEction={setHandleEction}
              />
            ) : (
              <div className={c.commentBody}>
                {!!replyingTo && (
                  <span className={c.replyingTo}>{`@${replyingTo} `}</span>
                )}
                <span>{content}</span>
              </div>
            )}
          </>
        </Flex>
      </>
    </Flex>
  );
};
