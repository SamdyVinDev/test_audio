import CustomMenu from "@components/CustomMenu";
import editFill from "@iconify/icons-eva/edit-2-fill";
import deleteFill from "@iconify/icons-eva/trash-2-outline";
import { Icon } from "@iconify/react";
import { MoreHoriz } from "@mui/icons-material";
import {
    Box,
    Card,
    CardActionArea,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { itemActions } from "@redux/slices/item";
import { isString } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";

const styles: any = {
    Card: {
        // height: "280px",
        boxShadow: 6,
        position: "relative",
    },
    CardActionArea: {
        p: 2,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: "18px",
        fontWeight: "600",
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
    },
    optionContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
};

const CustomCard = ({
    data,
    onDelete,
    onEdit,
    title,
    details,
}: {
    data: any;
    onDelete: () => void;
    onEdit: () => void;
    title: string;
    details?: { label: string; value: any }[];
}) => {
    const dispatch = useDispatch();

    return (
        <Card sx={styles.Card}>
            <CardActionArea
                sx={styles.CardActionArea}
                onClick={() => dispatch(itemActions.setSelectedItem(data))}
            >
                <Box sx={styles.title}>{title}</Box>
                {details && (
                    <Stack spacing={1} sx={{ width: "100%" }}>
                        {details.map((x) => (
                            <Stack sx={styles.optionContainer}>
                                <Typography variant="body1" noWrap>
                                    {x.label}
                                </Typography>
                                {isString(x.value) ? (
                                    <Typography
                                        variant="body1"
                                        noWrap
                                        fontWeight="bold"
                                    >
                                        {x.value}
                                    </Typography>
                                ) : (
                                    <>{x.value}</>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                )}
            </CardActionArea>
            <Box
                sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
            >
                <CustomMenu
                    label={
                        <IconButton>
                            <MoreHoriz />
                        </IconButton>
                    }
                    content={[
                        {
                            label: (
                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon
                                        icon={editFill}
                                        width={20}
                                        height={20}
                                        style={{
                                            marginRight: "10px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <span>Edit</span>
                                </Stack>
                            ),
                            onClick: onEdit,
                        },
                        {
                            label: (
                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon
                                        icon={deleteFill}
                                        width={20}
                                        height={20}
                                        style={{
                                            marginRight: "10px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <span>Delete</span>
                                </Stack>
                            ),
                            onClick: onDelete,
                        },
                    ]}
                />
            </Box>
        </Card>
    );
};

export default CustomCard;
