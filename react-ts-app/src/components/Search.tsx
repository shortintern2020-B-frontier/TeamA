// Ohmura

import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions<OptionType>();

interface Props {
  option: OptionType[];
  onChange: any;
}

interface OptionType {
  meal_name: string;
  inputValue?: string;
}

const Search: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<OptionType | null>(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      meal_name: '',

    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    meal_name: '',

  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onChange(dialogValue.meal_name);
    handleClose();
  };

  const option = props.option;

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                meal_name: newValue,

              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              meal_name: newValue.inputValue,

            });
          } else {
            props.onChange(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params) as OptionType[];

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              meal_name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={option}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.meal_name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.meal_name}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search here" variant="outlined" />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-meal_name">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-meal_name">Add a new film</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.meal_name}
              onChange={(event) => setDialogValue({ ...dialogValue, meal_name: event.target.value })}
              label="meal_name"
              type="text"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}



export default Search;

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films: OptionType[] = [
//   { meal_name: 'The Shawshank Redemption', year: 1994 },
//   { meal_name: 'The Godfather', year: 1972 },
// ];


// export default function App() {
//   return <div></div>
// }