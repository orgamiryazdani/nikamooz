import { Link } from "react-router-dom";
import style from "./card.module.css";
import truncateText from "../../../utils/truncateText";
import Button from "../../button/button";
import { Badge } from "../../badge/badge";
import { CardProps } from "./card.types";
import DeletePost from "../delete/delete";
import EditPost from "../edit/edit";

const Card: React.FC<CardProps> = ({ id, title, body }: CardProps) => {
  return (
    <div
      dir='ltr'
      key={id}
      className={style.postCard}>
      <div dir='rtl'>
        <Badge>{id}</Badge>
      </div>
      <h1>{truncateText(title, 20)}</h1>
      <h3>{truncateText(body, 170)}</h3>
      <div className={`flex-center ${style.btnGroup}`}>
        <DeletePost
          id={id}
          title={title}
        />
        <EditPost
          id={id}
          title={title}
          body={body}
        />
        <Link to={`/post/${id}`}>
          <Button variant='secondary'>مشاهده بیشتر</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
