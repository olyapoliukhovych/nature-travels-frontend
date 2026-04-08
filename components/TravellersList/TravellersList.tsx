import TravellerCard from "../TravellerCard/TravellerCard";
import css from "./TravellersList.module.css";
import Pagination from "../Pagination/Pagination";
import { UserPublic } from "@/types/user";

interface Props {
  users: UserPublic[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export default function TravellersList({
  users,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {users.map((user) => (
          <li key={user._id} className={css.card}>
            <TravellerCard user={user} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Pagination
          fetchNextPage={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
