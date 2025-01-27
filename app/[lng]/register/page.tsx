'use client';

import {Button, Form, Input, message} from 'antd';
import {register} from '@/services/auth/authService';
import {useRouter} from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const onFinish = async (values: { email: string; username: string; password: string; confirmPassword: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error('Пароли не совпадают!');
            return;
        }

        try {
            await register({
                email: values.email,
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });

            message.success('Регистрация прошла успешно!');
            router.push('/login');
        } catch (error: any) {
            message.error(error.message || 'Ошибка при регистрации.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Ошибка:', errorInfo);
        message.error('Пожалуйста, заполните все поля.');
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-[400px] bg-[#282828] p-10 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">SIGN UP</h2>
                <Form
                    name="register"
                    layout="vertical"
                    className="w-full"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={<span className="text-white">Email</span>}
                        name="email"
                        rules={[
                            {required: true, message: 'Please input your email!'},
                            {type: 'email', message: 'Please enter a valid email address!'},
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            className="rounded-md bg-[#333333] text-white border-none"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-white">Username</span>}
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input
                            placeholder="Username"
                            className="rounded-md bg-[#333333] text-white border-none"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-white">Password</span>}
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className="rounded-md bg-[#333333] text-white border-none"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-white">Confirm Password</span>}
                        name="confirmPassword"
                        rules={[{required: true, message: 'Please confirm your password!'}]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            className="rounded-md bg-[#333333] text-white border-none"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
                        >
                            REGISTER
                        </Button>
                    </Form.Item>
                </Form>
                <div className="flex justify-center w-full text-sm mt-2 text-gray-400">
                    <a href="/login" className="hover:text-green-400">
                        Already have an account?
                    </a>
                </div>
            </div>
        </div>
    );
}
