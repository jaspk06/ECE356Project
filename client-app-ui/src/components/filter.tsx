import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Filter(props: { name: string, options: Array<string>, onChange: Function }) {
    const { name, options, onChange } = props;
    return (
        <Autocomplete
            freeSolo
            multiple
            id="tags-outlined"
            options={options}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={(e, value) => onChange(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label={name}
                />
            )}
        />
    );
}