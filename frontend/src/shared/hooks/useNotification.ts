import { useSnackbar } from 'notistack';

interface SnackbarOptions {
  anchorOrigin: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
  autoHideDuration: number;
}

interface Props {
  message: string;
  variant: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return ({ message, variant }: Props) => {
    const snackbarOptions: SnackbarOptions = {
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      autoHideDuration: 2000,
    };

    enqueueSnackbar(message, {
      ...snackbarOptions,
      variant,
    });
  };
};

export default useNotification;
