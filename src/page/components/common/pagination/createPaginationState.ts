import { IUser } from "../../../../models/IUser";

export const createPaginationState = (
  itemsPerPage: number,
  currentState: Array<IUser> | any,
  currentPage: number
) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return currentState.slice(indexOfFirstItem, indexOfLastItem);
};
