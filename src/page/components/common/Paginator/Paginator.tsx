import React, { useState } from "react";
import classes from "./Paginator.module.css";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage?: number;
  onPageChanged?: (pageNumber: number) => void;
  portionSize?: number;
};

let Paginator: React.FC<PropsType> = ({
                                        totalItemsCount,
                                        pageSize,
                                        currentPage = 1,
                                        onPageChanged = (x) => x,
                                        portionSize = 10
                                      }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const setPageActiveClass = (page: number) => {
    if (currentPage === page) return classes.active;
  };
  return (
    <div className={classes.paginationContainer}>
      {portionNumber > 1 && (
        <i
          className={`fas fa-angle-double-left ${classes.leftArrow}`}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        />
      )}
      <div className={classes.paginationBlock}>
        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => {
            return (
              <span
                className={`${classes.paginationNumbers} ${setPageActiveClass(page)}`}
                key={page}
                onClick={() => {
                  onPageChanged(page);
                }}
              >
                {page}
              </span>
            );
          })}
      </div>
      {portionCount > portionNumber && (
        <i
          className={`fas fa-angle-double-right ${classes.rightArrow}`}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        />
      )}
    </div>
  );
};

export default Paginator;
