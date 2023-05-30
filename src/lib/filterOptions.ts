import { FilterOptionsState } from "@mui/material";
import { getRegExp } from "korean-regexp";

export default function filterOptions<T>(
  options: T[],
  state: FilterOptionsState<T>
): T[] {
  const { getOptionLabel } = state;
  const inputValue = state.inputValue.toLowerCase().trim();

  if (inputValue === "") {
    return [];
  }

  return options.filter((option) => {
    const candidate = getOptionLabel(option).toLowerCase();

    return candidate.search(getRegExp(inputValue)) !== -1;
  });
}
