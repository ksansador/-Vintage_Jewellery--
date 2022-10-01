import React, {useState} from 'react';
import {Button, FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import MenuItem from "@mui/material/MenuItem";

const ProductForm = ({onSubmit, categories, error}) => {
  const [state, setState] = useState({
    title: "",
    price: '',
    description: "",
    category: '',
    image: "",
  });

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

  const submitFormHandler = e => {
    e.preventDefault();
      console.log(state);
      const formData = new FormData();

    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({...prevState, [name]: file}));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid
        container
        maxWidth="md"
        textAlign="center"
        marginX="auto"
        direction="column"
        rowSpacing={2}
      >
       < Grid item>
         <FormControl fullWidth  error={!!getFieldError('category')}>
           <InputLabel id="category-label">Category</InputLabel>
           <Select
               labelId="category-label"
               value={state.category}
               label="Category"
               fullWidth
               required
               name={'category'}
               onChange={inputChangeHandler}
           >
             {categories.map(category => (
                 <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
             ))}
           </Select>
             <FormHelperText>{ getFieldError('category')}</FormHelperText>
         </FormControl>
       </Grid>

          <FormElement
              onChange={inputChangeHandler}
              name={'title'}
              label={'Title'}
              value={state.title}
              required
              error={getFieldError('title')}
          />
          <FormElement
              type={'number'}
              onChange={inputChangeHandler}
              name={"price"}
              label={"Price"}
              required
              value={state.price}
              error={getFieldError('price')}
          />
          <FormElement
              onChange={inputChangeHandler}
              name={"description"}
              label={"Description"}
              required
              value={state.description}
              error={getFieldError('description')}
          />


        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
            error={!!getFieldError('image')}
          />
        </Grid>

        <Grid item>
          <Button
              type="submit"
              sx={{
                  bgcolor: '#576235',
                    '&:hover': {bgcolor: '#576235'
                  }}}
              variant="contained">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;