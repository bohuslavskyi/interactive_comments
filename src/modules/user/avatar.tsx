import c from "../../components/add-comment/add-comment.module.scss";

interface IAvatar {
  username: string;
  size?: number | string;
}
export const Avatar = (props: IAvatar) => {
  const { username, size = 32 } = props;
  return (
    <div className={c.avatar} style={{width: size, height: size}}>
      <img
        src={`/src/assets/avatars/image-${username}.png`}
        alt={username}
      />
    </div>
  );
};
