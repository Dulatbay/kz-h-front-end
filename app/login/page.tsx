'use client'

import { Button, Form, Input, message } from 'antd';
import { login } from '@/services/auth/authService';
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const data = await login(values.username, values.password);
            localStorage.setItem('token', data.access_token);

            message.success('Успешный вход!');

            router.push('/learn');
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Ошибка:', errorInfo);
        message.error('Пожалуйста, заполните все поля.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1223]">
            <div className="flex flex-row w-[900px] h-[600px] bg-[#131A2B] rounded-lg shadow-lg overflow-hidden">
                {/* Левая часть с изображением */}
                <div className="flex-1 relative bg-black">
                    <img
                        src="https://example.com/image.jpg" // Замените на ссылку изображения
                        alt="История"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h1 className="text-6xl font-bold text-red-600 mb-4">KZH</h1>
                        <p className="text-white text-lg">
                            Жеті ғасыр тарихын білмеген – ел жетесіз.
                        </p>
                    </div>
                </div>

                {/* Правая часть с формой */}
                <div className="flex flex-col justify-center items-center w-[400px] bg-[#1B2235] p-8">
                    <h2 className="text-4xl font-bold text-red-600 mb-8">SIGN IN</h2>
                    <Form
                        name="login"
                        layout="vertical"
                        className="w-full"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label={<span className="text-white">Email or username</span>}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                placeholder="Email or username"
                                className="rounded-md bg-[#2E3A56] text-black"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-white">Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                className="rounded-md bg-[#2E3A56] text-black"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
                            >
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-between w-full text-sm mt-2 text-gray-400">
                        <a href="#" className="hover:text-white">
                            Forgot password?
                        </a>
                        <a href="/signup" className="hover:text-green-400">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
