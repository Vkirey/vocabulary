import { Button, IconButton } from "@mui/material";
import * as React from "react";
import lang_flag from "../assets/lang_flag.svg";
import styled from "@emotion/styled";
import { useLanguage } from "../Providers/LanguageProvider";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router-dom";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledIconButton = styled(IconButton)`
  padding: 9px;
  border-radius: 14px;
  margin: 10px;
`;

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const goToHomePage = () => {
      navigate("/")
  }

  return (
    <ButtonsContainer>
      <Button onClick={goToHomePage}>HOME</Button>
      <StyledIconButton
        disabled={language === LANGUAGES.ENG_TO_GER}
        onClick={() => changeLanguage(LANGUAGES.ENG_TO_GER)}
      >
        <img
          src={lang_flag}
          alt=""
          height={20}
          width={20}
          style={{ marginRight: "10px" }}
        />
        {"  English to German"}
      </StyledIconButton>

      <StyledIconButton
        disabled={language === LANGUAGES.GER_TO_ENG}
        onClick={() => changeLanguage(LANGUAGES.GER_TO_ENG)}
      >
        <img
          src={lang_flag}
          alt=""
          height={20}
          width={20}
          style={{ marginRight: "10px", transform: "rotate(180deg)" }}
        />
        {"  German to English"}
      </StyledIconButton>
    </ButtonsContainer>
  );
};
