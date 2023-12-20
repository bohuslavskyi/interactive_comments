// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import {
  EditCommentType,
  IComment,
  ReplyCommentType,
  VoteCommentType,
} from "../../types/types.ts";

const initialState = {
  users: [
    {
      userId: 111,
      username: "juliusomo",
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
    },
    {
      userId: 222,
      username: "maxblagun",
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
    },
    {
      userId: 333,
      username: "ramsesmiron",
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-ramsesmiron.webp",
      },
    },
    {
      userId: 444,
      username: "amyrobson",
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
    },
  ],
  currentUser: {
    userId: 111,
    username: "juliusomo",
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        userId: 444,
        username: "amyrobson",
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        userId: 222,
        username: "maxblagun",
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            userId: 333,
            username: "ramsesmiron",
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            userId: 111,
            username: "juliusomo",
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
          },
        }
      ],
    },
    {
      id: 5,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        userId: 222,
        username: "maxblagun",
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
      },
      replies: [],
    },
  ],
};

const formatDateDistance = (date: Date): string => {
  return moment(date).fromNow();
};

const reCalculateVote = (
  comments: IComment[],
  isReply: boolean,
  commentId: number,
  sum: number,
) => {
  comments.some((el) => {
    if (isReply && el.replies?.length) {
      return reCalculateVote(el.replies, isReply, commentId, sum);
    }

    if (el.score === 0 && sum === -1) return;
    if (el.id === commentId) {
      el.score += sum;
      comments.sort((a, b) => b.score - a.score);
      return true;
    }
  });
};

const editComment = (
  comments: IComment[],
  content: string,
  isReply: boolean,
  editCommentId: number,
) => {
  comments.some((el) => {
    if (isReply && el.replies?.length) {
      return editComment(el.replies, content, isReply, editCommentId);
    }

    if (el.id === editCommentId) {
      el.content = content;
      return true;
    }
  });
};

const createReply = (
  comments: IComment[],
  newReply: IComment,
  isReply: boolean,
  replyCommentId: number,
) => {
  comments.some((el) => {
    if (isReply && el.replies?.length) {
      return createReply(el.replies, newReply, isReply, replyCommentId);
    }

    if (el.id === replyCommentId) {
      el.replies?.push(newReply);
      return true;
    }
  });
};

const deleteComment = (comments: IComment[], deleteId: number) => {
  comments.some((el, index) => {
    if (el.id !== deleteId && el.replies?.length) {
      return deleteComment(el.replies, deleteId);
    }
    
    if (el.id === deleteId) {
      comments.splice(index, 1)
      return true
    }
  });
};

export const CommentSlice = createSlice({
  name: "commentsData",
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<VoteCommentType>) => {
      const { comments } = state;
      const { sum, isReply, commentId } = action.payload;

      reCalculateVote(comments, isReply, commentId, sum);
    },
    send: (state, action: PayloadAction<{ commentBody: string }>) => {
      const currentDate = new Date();
      const formattedDate = formatDateDistance(currentDate);
      const newComment = {
        id: parseInt(uuidv4().substring(0, 8), 16), // Generate a unique ID
        content: action.payload.commentBody,
        createdAt: formattedDate,
        score: 0,
        user: state.currentUser,
        replies: [],
      };
      state.comments.push(newComment);
    },
    edit: (state, action: PayloadAction<EditCommentType>) => {
      const { comments } = state;
      const { content, isReply, commentId } = action.payload;

      editComment(comments, content, isReply, commentId);
    },
    reply: (state, action: PayloadAction<ReplyCommentType>) => {
      const { comments } = state;
      const { replaingComment, content, isReply } = action.payload;
      const currentDate = new Date();
      const formattedDate = formatDateDistance(currentDate);

      const newComment = {
        id: parseInt(uuidv4().substring(0, 8), 16), // Generate a unique ID
        content,
        createdAt: formattedDate,
        score: 0,
        user: state.currentUser,
        replyingTo: replaingComment.user.username,
      };

      createReply(comments, newComment, isReply, replaingComment.id);
    },
    remove: (state, action: PayloadAction<number>) => {
      deleteComment(state.comments, action.payload);
    },
  },
});

export default CommentSlice.reducer;
export const { vote, send, reply, edit, remove } = CommentSlice.actions;
