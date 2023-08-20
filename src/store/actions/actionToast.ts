import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Hàm hiển thị thông báo thành công
export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Thời gian hiển thị (ms)
    });
};

// Hàm hiển thị thông báo lỗi
export const showErrorToast = (errorMessage: string) => {
    toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000, // Thời gian hiển thị (ms)
    });
};
