import * as React from "react";
import styles from "./Login.module.css";
import {
  Unstable_Popup as BasePopup,
  PopupProps,
} from "@mui/base/Unstable_Popup";
import { Box, styled, Theme } from "@mui/system";

interface PopuploginPrivacyPolicyProps extends PopupProps {
  buttonLabel: string;
}

export default function PopuploginPrivacyPolicy(
  props: PopuploginPrivacyPolicyProps
) {
  const { id, buttonLabel, ...other } = props;

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Popup id={id} open={open} anchor={anchor} {...other}>
        {/* here can change popup box words */}
        <PopupBody id={styles.popupBox}>
          <p id={styles.loginPrivacyPolicyWords}>
            We are committed to protecting the privacy of our users.<p></p>We
            collect personal information,<p></p>such as your name and email
            address,<p></p>when you interact with our website or use our
            services.<p></p>We use this information to provide and improve our
            services,<p></p>communicate with you,<p></p>and comply with legal
            requirements.<p></p>We take reasonable measures to secure your data
            <p></p>
            and may share it with trusted third-party service providers.<p></p>
            You have the right to access, update, <p></p>or delete your personal
            information. <p></p>If you have any questions, please contact us.
          </p>
        </PopupBody>
      </Popup>
    </div>
  );
}

const Popup = styled(BasePopup)`
  z-index: 1;
`;

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const PopupBody = styled("div")(
  ({ theme }: { theme: Theme }) => `
  display: flex;
  align-items: center;
  padding: 0px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`
);

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

//   color: white;
//   background-color: ${blue[500]};

const Button = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: 3px solid #2e7d32;
    color: white;
  background-color: #2e7d32;
  background-color: rgba(${blue[500].slice(1)});
  opacity: 0.8;

  &:hover {
    background-color: rgba(66, 67, 71, 255);
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`
);
