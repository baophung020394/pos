import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import InputFieldLoginForm from '@components/InputFieldLoginForm';
import { loginUser } from '@store/actions/actionLogin';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '@store/index';

interface FormData {
    Username: string | '';
    Password: string | '';
}

const LoginCover = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const error = useSelector((state: IRootState) => state.auth.error);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(setPageTitle('Login Cover'));
    });
    const navigate = useNavigate();

    const submitForm = async (data: FormData) => {
        await dispatch(loginUser({ Username: data?.Username, Password: data.Password }));
        if (!error) {
            navigate('/');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="bg-gradient-to-t from-[#ff1361bf] to-[#44107A] w-1/2  min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black p-4">
                <div className="w-full mx-auto mb-5">
                    <img src="/assets/images/auth-cover.svg" alt="coming_soon" className="lg:max-w-[370px] xl:max-w-[500px] mx-auto" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-center">Join the community of expert developers</h3>
                <p>It is easy to setup with great customer experience. Start your 7-day free trial</p>
            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center items-center">
                <div className="max-w-[480px] p-5 md:p-10">
                    <h2 className="font-bold text-3xl mb-3">Sign In</h2>
                    <p className="mb-7">Enter your email and password to login</p>
                    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <label htmlFor="email">Phone</label>
                            {/* <InputFieldLoginForm name="phone" placeholder="Phone" control={control} type="text" className="form-input" /> */}
                            <input id="username" type="text" className="form-input" placeholder="Enter username" {...register('Username')} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-input" placeholder="Enter Password" {...register('Password')} />
                            {error ? <div className={`${error ? 'text-red-600' : 'text-green-600'}`}>{error}</div> : null}
                            {/* <InputFieldLoginForm name="password" className="form-input" placeholder="Password" control={control} type="password" /> */}
                        </div>
                        <div>
                            <label className="cursor-pointer">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Remember me</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            SIGN IN
                        </button>
                    </form>
                    <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2]  dark:before:bg-[#253b5c]">
                        <div className="font-bold text-white-dark bg-[#fafafa] dark:bg-[#060818] px-2 relative z-[1] inline-block">
                            <span>OR</span>
                        </div>
                    </div>
                    <p className="text-center">
                        Dont&apos;t have an account ?
                        <Link to="/auth/cover-register" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginCover;
