import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const toastService = {
    success: (message: string) => {
        toast.success(message, { ...defaultOptions });
    },

    error: (message: string) => {
        toast.error(message, { ...defaultOptions, autoClose: 5000 });
    },

    warning: (message: string) => {
        toast.warning(message, { ...defaultOptions });
    },

    info: (message: string) => {
        toast.info(message, { ...defaultOptions });
    },

    apiError: (error: any, customMessage?: string) => {
        const message = customMessage ||
            error?.response?.data?.message ||
            'Ocorreu um erro inesperado';

        const statusCode = error?.response?.status;

        toast.error(
            `${message}${statusCode ? ` (Código: ${statusCode})` : ''}`,
            { ...defaultOptions, autoClose: 6000 }
        );
    },
};