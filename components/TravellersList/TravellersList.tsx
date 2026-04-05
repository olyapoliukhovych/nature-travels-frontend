import { User } from "@/types/user";
import TravellerCard from "../TravellerCard/TravellerCard";
import css from "./TravellersList.module.css";

interface Props {
  users: User[];
}

export default function TravellersList({ users }: Props) {
  return (
    <ul className={css.list}>
      {users.map((user) => (
        <li key={user._id} className={css.card}>
          <TravellerCard user={user} />
        </li>
      ))}
    </ul>
  );
}
