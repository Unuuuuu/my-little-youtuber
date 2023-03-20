import TabPanel, { Props as TabPanelProps } from "@/app/components/TabPanel";
import { FormEventHandler, useRef, useState } from "react";
import { useChannelContext } from "./ChannelContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/userSlice";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

interface Props extends Omit<TabPanelProps<ChannelTabsValue>, "children"> {}

export default function SettingTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const { isSignedIn, nicknames } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    nicknames: state.user.nicknames,
  }));
  const { id: channelId, title: channelTitle } = useChannelContext();
  const nickname = nicknames[channelId];
  const [isInputError, setIsInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  if (!isSignedIn) {
    return null;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (inputRef.current === null) {
      return;
    }

    if (inputRef.current.value.trim() === "") {
      setIsInputError(true);
      inputRef.current.focus();
      return;
    }

    dispatch(
      userSliceActions.updateNickname({
        nickname: inputRef.current.value,
        channelId,
      })
    );
    setIsInputError(false);
    inputRef.current.value = "";
  };

  return (
    <TabPanel<ChannelTabsValue> value={value} selectedValue={selectedValue}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 1, wordBreak: "keep-all" }}>
          <Typography>
            <Box component={"b"} fontWeight={500}>
              {channelTitle}
            </Box>
            에서 사용할 닉네임을 설정해주세요.
          </Typography>
          {nickname !== undefined && (
            <Typography>
              현재 닉네임은{" "}
              <Box component={"b"} fontWeight={500}>
                {nickname}
              </Box>
              입니다.
            </Typography>
          )}
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 1 }}>
            <TextField
              inputRef={inputRef}
              error={isInputError}
              fullWidth
              size="small"
              placeholder="닉네임을 입력해주세요."
            />
            <Typography variant="caption" color={"GrayText"}>
              부적절한 닉네임은 서비스 이용에 제한이 있을 수 있습니다.
            </Typography>
          </Box>
          <Button
            startIcon={<DriveFileRenameOutlineRoundedIcon />}
            fullWidth
            variant="contained"
            type="submit"
            color="secondary"
          >
            {nickname === undefined ? "설정하기" : "변경하기"}
          </Button>
        </form>
      </Box>
    </TabPanel>
  );
}
