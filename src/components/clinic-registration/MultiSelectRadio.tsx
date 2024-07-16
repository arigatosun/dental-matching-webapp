// MultiSelectRadio.tsx
import React from 'react';
import { FormGroup, FormControlLabel, Button, Typography, Grid } from '@mui/material';

interface MultiSelectRadioProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  name: string;
}

const MultiSelectRadio: React.FC<MultiSelectRadioProps> = ({ options, selected, onChange, name }) => {
  const handleToggle = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <FormGroup>
      <Typography variant="subtitle2">{name}</Typography>
      <Grid container spacing={1}>
        {options.map((option) => (
          <Grid item key={option}>
            <FormControlLabel
              control={
                <Button
                  variant={selected.includes(option) ? "contained" : "outlined"}
                  onClick={() => handleToggle(option)}
                  size="small"
                >
                  {selected.includes(option) ? "✓" : ""}
                </Button>
              }
              label={option}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};

export default MultiSelectRadio;