export type User = {
  userId: number;
  username: string;
  image: {
    png: string;
    webp: string;
  };
};

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: IComment[];
  replyingTo?: string;
}

export interface ICommentProps {
  comment: IComment;
  isHasReply: boolean;
  isActionsVisible: boolean;
  handleEction: CommentEctionTypes;
  setHandleEction: (val: CommentEctionTypes) => void;
  showModal: (id: number | null) => void;
}

export type CommentEctionTypes = "send" | "reply" | "edit" | undefined;

export type VoteCommentType = {
  sum: number;
  commentId: number;
  isReply: boolean;
};

export type SendCommentType = {
  content: string;
};

export interface EditCommentType extends SendCommentType {
  commentId: number;
  isReply: boolean;
}

export interface ReplyCommentType extends SendCommentType {
  replaingComment: IComment;
  content: string;
  isReply: boolean;
}
