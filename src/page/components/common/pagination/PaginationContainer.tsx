import React from "react";
import { Pagination } from "./Pagination";
import classes from "./pagination.module.css";
import { IUser } from "../../../../models/IUser";

interface IProps {
  itemsPerPage: number;
  currentState: Array<IUser>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationContainer: React.FC<IProps> = ({
  currentState,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(currentState.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPage = (pageNumber:number) => setCurrentPage(pageNumber);

  const setActiveClass = (number:number) => {
    if (currentPage === number) return classes.active;
  };

  const setHideClass = () => {
    if (currentState.length === 0) return classes.hide;
  };

  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
  };

  return (
    <Pagination
      setPage={setPage}
      setActiveClass={setActiveClass}
      setHideClass={setHideClass}
      previousPage={previousPage}
      nextPage={nextPage}
      pageNumbers={pageNumbers}
    />
  );
};
