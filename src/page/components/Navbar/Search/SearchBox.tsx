import React from "react";
import classes from "./SearchBox.module.css";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  FilterType,
  requestUsers,
  usersSelector,
} from "../../../../redux/reducers/usersReducer/users-reducer";
import { friendParamValueConvert } from "../../../../utils/friendParamValueConvert";

export interface ISearchForm {
  term: string;
  friend: "true" | "false" | "null";
}

export const SearchBox: React.FC = () => {
  const { filter, pageSize } = useAppSelector(usersSelector);
  const { register, handleSubmit } = useForm<ISearchForm>();

  const dispatch = useAppDispatch();

  const onSearchSubmit = handleSubmit((data) => {
    const filter: FilterType = {
      ...data,
      friend: friendParamValueConvert(data.friend),
    };
    dispatch(requestUsers({ pageSize, page: 1, filter }));
  });

  return (
    <form className={classes.inputBlock} onSubmit={onSearchSubmit}>
      <i className={`fas fa-search ${classes.searchIcon}`} />
      <input
        defaultValue={filter.term}
        type="search"
        placeholder={"Search for users"}
        className={classes.searchInput}
        {...register("term")}
      />
      <select
        defaultValue={String(filter.friend)}
        className={classes.selectBlock}
        {...register("friend")}
      >
        <option value="null">All users</option>
        <option value="true">Followed</option>
        <option value="false">Not Followed</option>
      </select>

      <button type="submit">Find</button>
    </form>
  );
};
