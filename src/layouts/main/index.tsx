import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
    const { pathname } = useRouter();

    return <Box>{children}</Box>;
}
