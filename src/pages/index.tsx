import { LoadingButton } from "@mui/lab";
import {
    Box,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactAudioPlayer from "react-audio-player";

export default function index() {
    const [text, setText] = useState(
        "តម្លៃ​សាំង​លក់ រាយ​ នៅ​ទីផ្សារ​កម្ពុជា​ធ្លាក់ចុះ​ ៥០ ​រៀល​ក្នុង​ ១​ លីត្រ។",
    );
    const [base64, setBase64] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSound = async () => {
        setLoading(true);
        const soundRes = await axios.post(
            "http://103.16.60.27:8800/api/v1/text-to-speech",
            {
                data: {
                    text: text,
                },
            },
        );
        const _base64 = await soundRes.data.data.base64;
        setBase64(_base64);
        console.log(_base64);
        setLoading(false);
    };

    const playSound = async () => {
        const sound = new Audio(base64);
        sound.play();
    };

    return (
        <Container maxWidth={"xl"} sx={{ alignContent: "center", pt: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h3" align="center" color={"primary"}>
                    Khmer Text To Speech
                </Typography>
                <TextField
                    id="khmer-text-input"
                    label="សូមបំពេញពាក្យក្នុងប្រអប់"
                    multiline
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ "& audio": { backgroundColor: "white" } }}
                >
                    {/* <audio autoPlay controls src={base64} style={{ flex: 1 }} /> */}
                    <ReactAudioPlayer
                        src={base64}
                        autoPlay={!!base64}
                        style={{ flex: 1 }}
                        controls
                    />
                    <LoadingButton
                        onClick={fetchSound}
                        loading={loading}
                        startIcon={<PlayCircleIcon />}
                        variant="contained"
                    >
                        Play
                    </LoadingButton>
                </Stack>
            </Stack>
        </Container>
    );
}
