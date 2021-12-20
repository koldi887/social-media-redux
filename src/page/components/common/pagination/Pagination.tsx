import React from "react";
import classes from "./pagination.module.css";

interface IProps {
  setPage: (value: number) => void;
  setActiveClass: (value: number) => typeof classes.active | undefined;
  setHideClass: () => typeof classes.hide | undefined;
  previousPage: () => void;
  nextPage: () => void;
  pageNumbers: number[];
}

export const Pagination: React.FC<IProps> = ({
  setPage,
  setActiveClass,
  setHideClass,
  previousPage,
  nextPage,
  pageNumbers,
}) => {
  return (
    <div className={classes.paginationContainer}>
      <i
        className={`fas fa-angle-double-left ${
          classes.leftArrow
        } ${setHideClass()}`}
        onClick={previousPage}
      />
      <ul className={`list ${classes.paginationBlock}`}>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`${classes.paginationNumbers} ${setActiveClass(
              pageNumber
            )}`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
      <i
        className={`fas fa-angle-double-right ${
          classes.rightArrow
        } ${setHideClass()}`}
        onClick={nextPage}
      />
    </div>
  );
};
