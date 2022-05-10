import PropTypes from "prop-types";
import { forwardRef } from "react";
// material
import { IconButton } from "@mui/material";
//
import { ButtonAnimate } from "../animate";

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }: any, ref: any) => (
    <ButtonAnimate>
        <IconButton ref={ref} {...other}>
            {children}
        </IconButton>
    </ButtonAnimate>
));

export default MIconButton;
