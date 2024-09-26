'use client';
import {signIn} from "next-auth/react";
import {register} from "next/dist/client/components/react-dev-overlay/pages/client";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";


interface ILoginForm {
    email: string;
    password: string;
}


function Page() {
    const { register, handleSubmit } = useForm<ILoginForm>();
    const router = useRouter();

    const login = async (data: ILoginForm) => {
        const response = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        });

        if(!response?.error) {
            router.push('/home');
        }
    }


    return (
        <div>
            <h1>Login Page</h1>
            <form
                onSubmit={handleSubmit(login)}
            >
                <label htmlFor="email">Email</label>
                <input
                    {...register('email')}
                    type="email" id="email" />
                <label htmlFor="password">Password</label>
                <input {...register('password')} type="password" id="password" />
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}


export default Page;