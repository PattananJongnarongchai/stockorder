// MonthAutocomplete.tsx
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';

interface MonthAutocompleteProps {
  value: string | null;
  onChange: (event: React.ChangeEvent<{}>, newValue: string | null) => void;
}

const MonthAutocomplete: React.FC<MonthAutocompleteProps> = ({ value, onChange }) => {
  // Generate next 12 months
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().add(i + 1, 'month').format('MMMM YYYY')
  );

  return (
    <Autocomplete
      options={months}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" />}
    />
  );
};

export default MonthAutocomplete;
