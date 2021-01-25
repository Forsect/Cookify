import React from "react";
import styles from "./SearchInput.module.scss";
import classNames from "classnames";
import SearchIcon from "../icons/SearchIcon";

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  searchedName: string;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  return (
    <div className={classNames(props.borderClassName, styles.inputBorder)}>
      <SearchIcon onClick={() => {}} className={styles.searchIcon} />
      <input
        value={props.searchedName}
        className={classNames(props.inputClassName, styles.input)}
        type="text"
        onChange={props.onChange}
        placeholder={props.placeholder ? props.placeholder : undefined}
      />
    </div>
  );
};

export default SearchInput;
