"use client";

import { createContext, useContext } from "react";

export interface TagsContextValue {
  tags: TagData[];
  generalTags: GeneralTagData[];
  etcTags: GeneralTagData[];
}

const TagsContext = createContext<TagsContextValue | null>(null);

export const useTagsContext = () => {
  const value = useContext(TagsContext);
  if (value === null) {
    throw new Error("TagsContext의 Provider로 감싸야합니다.");
  }

  return value;
};

interface Props {
  children?: React.ReactNode;
  value: TagsContextValue;
}

export function TagsContextProvider(props: Props) {
  return (
    <TagsContext.Provider value={props.value}>
      {props.children}
    </TagsContext.Provider>
  );
}
