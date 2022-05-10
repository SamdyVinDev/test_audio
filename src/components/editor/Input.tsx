import { capitalize } from "lodash";
import React, { useState } from "react";
import { FastField } from "formik";
import {
    Stack,
    Typography,
    TextField,
    Paper,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormHelperText,
    Slider,
    IconButton,
    InputAdornment,
    Autocomplete,
} from "@mui/material";
// import { QuillEditor } from "@components/editor";
import MapPicker from "react-google-map-picker";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const styles = {
    FInputContainer: {
        width: "100%",
        padding: "16px",
        marginBottom: "16px",
    },
};

export const FInputContainer = ({
    title,
    children,
    inputSpacing,
    ...other
}: any) => {
    return (
        <Stack
            elevation={2}
            component={Paper}
            style={styles.FInputContainer}
            {...other}
        >
            <Typography variant="subtitle1" gutterBottom>
                {title}
            </Typography>
            <Stack direction="column" spacing={inputSpacing || 2}>
                {children}
            </Stack>
        </Stack>
    );
};

export const FInput = ({ name, label, password = false }: any) => {
    return (
        <FastField name={name}>
            {({ field, meta }: any) => (
                <TextField
                    fullWidth
                    type={!password ? "text" : "password"}
                    size="small"
                    label={capitalize(label || name)}
                    error={!!meta.error}
                    helperText={meta.error}
                    {...field}
                />
            )}
        </FastField>
    );
};

export const FMultiSelectAutocomplete = ({ name, label, options }: any) => {
    return (
        <FastField name={name}>
            {({ field, meta, form }: any) => (
                <Autocomplete
                    multiple
                    fullWidth
                    size="small"
                    id={`${name}-${label}`}
                    options={options}
                    disableCloseOnSelect
                    value={field.value}
                    onChange={(e: any, value: any) =>
                        form.setFieldValue(name, value)
                    }
                    getOptionLabel={(option: any) => option.label}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlank fontSize="small" />}
                                checkedIcon={<CheckBox fontSize="small" />}
                                style={{
                                    marginRight: 8,
                                }}
                                checked={selected}
                            />
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={capitalize(label || name)}
                            placeholder={capitalize(label || name)}
                        />
                    )}
                />
            )}
        </FastField>
    );
};

export const FSelect = ({ name, label, options }: any) => {
    return (
        <FastField name={name}>
            {({ field, meta }: any) => (
                <FormControl fullWidth size="small" error={!!meta.error}>
                    <InputLabel id={`${name}-${label}`}>
                        {options
                            ? options.length > 0
                                ? `Select ${capitalize(label || name)}`
                                : "No Options Available"
                            : "Loading..."}
                    </InputLabel>
                    <Select
                        disabled={!options || options.length === 0}
                        labelId={`${name}-${label}`}
                        id={`${name}-${label}-select`}
                        label={
                            options
                                ? options.length > 0
                                    ? `Select ${capitalize(label || name)}`
                                    : "No Options Available"
                                : "Loading..."
                        }
                        value={field.value}
                        {...field}
                    >
                        {options &&
                            options.length > 0 &&
                            options.map((option: any) => (
                                <MenuItem value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                    </Select>

                    {!!meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                    )}
                </FormControl>
            )}
        </FastField>
    );
};

export const FCheckBox = ({ name, label, value }: any) => {
    return (
        <FastField name={name}>
            {({ field, meta }: any) => (
                <FormControlLabel
                    label={label}
                    control={
                        <Checkbox
                            defaultChecked={field.value.includes(
                                parseInt(value),
                            )}
                        />
                    }
                    {...field}
                    value={value}
                />
            )}
        </FastField>
    );
};

// export const FQuill = ({ name, label }: any) => {
//     function getPlaceholder(): string {
//         if (label) {
//             return `Write something about ${capitalize(label)}`;
//         }

//         return `Write something about ${capitalize(name)}...`;
//     }

//     return (
//         <FastField name={name}>
//             {({ field, meta, form }: any) => (
//                 <>
//                     <QuillEditor
//                         placeholder={getPlaceholder()}
//                         error={!!meta.error}
//                         id={`${name}-quill`}
//                         simple
//                         value={field.value}
//                         onChange={(value: any) =>
//                             form.setFieldValue(name, value)
//                         }
//                     />
//                     {!!meta.error && (
//                         <Typography
//                             sx={{
//                                 color: "error",
//                                 fontSize: "12px",
//                                 m: "14px 8px 0",
//                             }}
//                         >
//                             {meta.error}
//                         </Typography>
//                     )}
//                 </>
//             )}
//         </FastField>
//     );
// };

export const FMap = ({ name, label }: any) => {
    const [defaultLocation, setDefaultLocation] = React.useState({
        lat: 11.5932959,
        lng: 104.9087607,
    });
    const [location, setLocation] = React.useState(defaultLocation);
    const [zoom, setZoom] = React.useState(13);

    function handleChangeLocation(lat: any, lng: any) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom: any) {
        setZoom(newZoom);
    }

    return (
        <FastField name={name}>
            {({ field, meta, form }: any) => (
                <Stack>
                    <MapPicker
                        defaultLocation={defaultLocation}
                        zoom={zoom}
                        style={{ height: "550px", borderRadius: "5px" }}
                        onChangeLocation={(lat: any, lng: any) =>
                            form.setFieldValue(name, { lat, lng })
                        }
                        onChangeZoom={handleChangeZoom}
                        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
                        {...field}
                    />
                    {!!meta.error && (
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: "12px",
                                m: "14px 8px 0px",
                            }}
                        >
                            {meta.error}
                        </Typography>
                    )}
                </Stack>
            )}
        </FastField>
    );
};

function valuetext(value: any) {
    return `${value}%`;
}

export const FSlide = ({ name, label, max, type }: any) => {
    return (
        <FastField name={name}>
            {({ field, meta }: any) => (
                <Stack direction="column" sx={{ width: "100%" }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>{capitalize(label || name)}</Typography>
                        <Typography>
                            {field.value}
                            {type && type}
                        </Typography>
                    </Stack>
                    <Slider
                        size="small"
                        getAriaValueText={valuetext}
                        step={5}
                        max={max}
                        {...field}
                        valueLabelDisplay="auto"
                    />

                    {!!meta.error && (
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: "12px",
                                m: "14px 8px 0px",
                            }}
                        >
                            {meta.error}
                        </Typography>
                    )}
                </Stack>
            )}
        </FastField>
    );
};
