import {FC} from "react";
import Comments from "./modules/comments/comments.tsx";

import c from "./App.module.scss";

const App: FC = () => {
  return <div className={c.appWrap}>
    <Comments/>
  </div>;
};

export default App;
