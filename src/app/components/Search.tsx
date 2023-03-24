"use client";

import { UseAutocompleteProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";

interface Props {
  channels: Pick<
    ChannelData,
    "id" | "scoresSize" | "thumbnail" | "title" | "updateTime"
  >[];
}

const Search = memo((props: Props) => {
  const { channels } = props;
  const router = useRouter();

  const options = useMemo(
    () => channels.map((channel) => ({ id: channel.id, label: channel.title })),
    [channels]
  );

  const handleChange: UseAutocompleteProps<
    { id: string; label: string },
    false,
    false,
    false
  >["onChange"] = (_, value) => {
    router.push(`/channel/${value?.id}`);
  };

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="검색" size="small" />
      )}
      onChange={handleChange}
      noOptionsText="해당하는 유튜버가 없습니다"
    />
  );
});

Search.displayName = "Search";

export default Search;
