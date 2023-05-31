import { FilterOptionsState } from "@mui/material";
import { getRegExp } from "korean-regexp";

export default function filterOptions(
  options: ChannelDataWithTotalPlayCount[],
  state: FilterOptionsState<ChannelDataWithTotalPlayCount>
): ChannelDataWithTotalPlayCount[] {
  const { getOptionLabel } = state;
  const inputValue = state.inputValue.toLowerCase().trim();

  if (inputValue === "") {
    return [];
  }

  return options
    .filter((option) => {
      const candidate = getOptionLabel(option).toLowerCase();

      return (
        candidate.search(
          getRegExp(inputValue, {
            initialSearch: true,
            fuzzy: true,
          })
        ) !== -1
      );
    })
    .reduce<ChannelDataWithTotalPlayCount[]>((prev, cur) => {
      if (
        getOptionLabel(cur)
          .toLowerCase()
          .search(
            getRegExp(inputValue, { initialSearch: true, startsWith: true })
          ) === -1
      ) {
        return [...prev, cur];
      } else {
        return [cur, ...prev];
      }
    }, []);
}
