import {JSX, memo, MouseEvent, useState} from "react";

import { CommentEctionTypes, IComment } from "../../types/types.ts";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CommentContent } from "../../modules/comments/comment-content/comment-content.tsx";
import { AddComment } from "../add-comment/add-comment.tsx";
import ReplyItem from "./reply-item.tsx";
import Flex from "../flex/flex.tsx";

import c from "./comment.module.scss";

type PropsType = {
  comment: IComment;
  parentComment?: IComment;
  showModal: (id: number | null) => void;
};

const Comment = (props: PropsType): JSX.Element => {
  const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);
  const [handleEction, setHandleEction] =
    useState<CommentEctionTypes>(undefined);

  const { comment, parentComment, showModal } = props;
  const { replies = [] } = comment;

  const [animationParent] = useAutoAnimate();
  const isHasReply = !!replies?.length;

  const mouseTrigger = (e: MouseEvent<HTMLDivElement>) => {
    setIsActionsVisible(e.type === "mouseenter");
  };
  
  return (
    <Flex className={c.wrap} direction={"column"} gap={8}>
      <>
        <div
          className={c.comment}
          onMouseEnter={mouseTrigger}
          onMouseLeave={mouseTrigger}
        >
          <CommentContent
            comment={comment}
            isHasReply={isHasReply}
            isActionsVisible={isActionsVisible}
            handleEction={handleEction}
            setHandleEction={setHandleEction}
            showModal={showModal}
          />
        </div>

        {handleEction === "reply" && (
          <AddComment
            type="reply"
            commentToReply={parentComment || comment}
            setHandleEction={setHandleEction}
          />
        )}

        {isHasReply && (
          <Flex className={c.reply}>
            <>
              <div className={c.divider} />
              <Flex
                myRef={animationParent}
                className={c.replyWrap}
                gap={20}
                direction="column"
              >
                <>
                  {replies.map((reply) => (
                    <ReplyItem
                      key={reply.id}
                      reply={reply}
                      parentComment={comment}
                      showModal={showModal}
                    />
                  ))}
                </>
              </Flex>
            </>
          </Flex>
        )}
      </>
    </Flex>
  );
};

export default memo(Comment);
