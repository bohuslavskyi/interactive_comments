import {JSX} from "react";
import {useAppDispatch} from "../../../store/store.ts";
import {vote} from "../../../store/features/commentsSlice.ts";
import IconPlus from "../../../assets/icon-plus.tsx";
import IconMinus from "../../../assets/icon-minus.tsx";

import c from "./score.module.scss";

interface IScoreProps {
  score: number;
  commentId: number;
  replyingTo: string;
}

export const Score = (props: IScoreProps): JSX.Element => {
  const { score, commentId, replyingTo } = props;
  const dispatch = useAppDispatch();
  const isReply = !!replyingTo;
  
  return (
    <div className={c.scoreWrap}>
      <button
        type="button"
        onClick={() => dispatch(vote({ sum: 1, commentId, isReply }))}
      >
        <IconPlus />
      </button>
      <span className={c.score}>{score}</span>
      <button
        type="button"
        onClick={() => dispatch(vote({ sum: -1, commentId, isReply }))}
      >
        <IconMinus />
      </button>
    </div>
  );
};