'use client'

import {Button, Form, Input, message} from 'antd';
import {login} from '@/services/auth/authService';
import {useRouter} from "next/navigation";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/utills/constants";
import {getImageUrl} from "@/utills/getHistoryData";

export default function LoginPage() {
    const router = useRouter();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const data = await login(values.username, values.password);
            localStorage.setItem(ACCESS_TOKEN, data.access_token);
            localStorage.setItem(REFRESH_TOKEN, data.access_token);

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
        <div className="min-h-screen flex justify-center">
            <div>

            </div>
            <div className="flex items-center justify-center">
                <div className="w-[400px] bg-[#282828] p-10 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">SIGN IN</h2>
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
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input
                                placeholder="Email or username"
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

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
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
