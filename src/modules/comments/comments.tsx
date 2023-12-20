import { FC, memo, useCallback, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { AddComment } from "../../components/add-comment/add-comment.tsx";
import Comment from "../../components/comment/comment.tsx";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { remove } from "../../store/features/commentsSlice.ts";
import { Modal } from "antd";
import Flex from "../../components/flex/flex.tsx";

import c from "./comments.module.scss";

const modalBtnStyle = {
  height: 48,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
};
const okButtonstyle = {
  style: { background: "#ED6368", ...modalBtnStyle },
};
const cancelButtonstyle = {
  style: { background: "#67727E", color: "white", ...modalBtnStyle },
};
const Comments: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector((state) => state.commentsData);

  const showModal = useCallback((id: number | null) => {
    setIsModalOpen(id);
  }, []);

  const handleOk = async () => {
    if (isModalOpen) {
      await dispatch(remove(isModalOpen));
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(null);
  };

  const [animationParent] = useAutoAnimate();

  return (
    <>
      <Modal
        centered
        width={400}
        title="Delete comment"
        open={!!isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="NO, CANCEL"
        okText="YES, DELETE"
        okButtonProps={okButtonstyle}
        cancelButtonProps={cancelButtonstyle}
      >
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
      </Modal>

      <Flex className={c.wrap} gap={20} direction="column" justify="flex-end">
        <>
          <Flex
            myRef={animationParent}
            direction="column"
            gap={20}
            className={c.commentsWrpa}
          >
            <>
              {comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    showModal={showModal}
                  />
                );
              })}
            </>
          </Flex>

          <div className={c.addComment}>
            <AddComment type="send" />
          </div>
        </>
      </Flex>
    </>
  );
};

export default memo(Comments);
