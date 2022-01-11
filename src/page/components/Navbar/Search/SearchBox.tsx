import React from "react";
import classes from "./SearchBox.module.css";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../hooks/redux";
import { FilterType, setFilter } from "../../../../redux/users-reducer";

export interface ISearchForm {
  term: string;
  friend: "true" | "false" | "null";
}

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const onSearchSubmit = (data: ISearchForm) => {
    const filter: FilterType = {
      ...data,
      friend: data.friend === "null" ? null : data.friend === "true",
    };
    dispatch(setFilter(filter));
  };

  return (
    <form
      className={classes.inputBlock}
      onSubmit={handleSubmit((data: ISearchForm) => onSearchSubmit(data))}
    >
      <i className={`fas fa-search ${classes.searchIcon}`} />
      <input
        type="search"
        placeholder={"Search for users"}
        className={classes.searchInput}
        {...register("term")}
      />
      <select className={classes.selectBlock} {...register("friend")}>
        <option value="null">All users</option>
        <option value="true">Followed</option>
        <option value="false">Not Followed</option>
      </select>

      <button type="submit">Find</button>
    </form>
  );
};

export default SearchBox;
