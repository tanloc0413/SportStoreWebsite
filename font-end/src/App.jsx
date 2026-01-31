import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { setLoading } from './store/features/common';
import { fetchCategories } from './api/fetchCategories';
import { loadCategories } from './store/features/category';
import HomePage from './page/HomePage/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f0f0f0',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Nunito Sans", sans-serif',
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetchCategories()
      .then(res => {
        dispatch(loadCategories(res));
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage/>
    </ThemeProvider>
  );
}

export default App;
