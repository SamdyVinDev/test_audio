import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Avatar, Palette, Theme, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

const MAvatar = forwardRef(
    ({ color = "default", sx, children, ...other }: any, ref: any) => {
        const theme: Theme = useTheme();

        if (color === "default") {
            return (
                <Avatar ref={ref} sx={sx} {...other}>
                    {children}
                </Avatar>
            );
        }

        return (
            <Avatar
                ref={ref}
                sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette[color].contrastText,
                    backgroundColor: theme.palette[color].main,
                    ...sx,
                }}
                {...other}
            >
                {children}
            </Avatar>
        );
    },
);

export default MAvatar;
