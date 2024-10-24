import { useEffect, useState } from "react";

import { useRetrieveProfile } from "../../../utils/hooks/api/user";
import Button from "../../button/Button";
import {
  selectUserInfos,
  useAppSelector,
} from "../../../utils/hooks/selectors";
import Skeleton from "../../../utils/skeleton/Skeleton";
import UserHeaderEdit from "./userHeaderEdit/UserHeaderEdit";

export default function UserHeader(): React.ReactElement {
  const { isLoading, handleRetrieveProfile } = useRetrieveProfile();
  const userInfos = useAppSelector(selectUserInfos);

  const [editMode, setEditMode] = useState<boolean>(false);

  const Head = (): React.ReactElement =>
    isLoading && !userInfos ? (
      <span className="user-header__head__skeleton">
        <Skeleton />
      </span>
    ) : (
      <h2>
        Welcome back
        <br />
        {`${userInfos?.firstName} ${userInfos?.lastName}`}
      </h2>
    );

  useEffect(() => {
    handleRetrieveProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (editMode) {
    return (
      <UserHeaderEdit setOnEdit={(state: boolean) => setEditMode(state)} />
    );
  }

  return (
    <div className="user-header">
      <Head />
      <Button onClick={() => setEditMode(true)} label="Edit Name" />
    </div>
  );
}
