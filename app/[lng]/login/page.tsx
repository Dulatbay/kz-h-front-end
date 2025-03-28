'use client'

import {Button, Form, Input, message} from 'antd';
import {login} from '@/services/auth/authService';
import {useRouter} from "next/navigation";
import { useTranslation } from 'react-i18next';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/utills/constants";
import Link from "next/link";

export default function LoginPage() {
    const {t} = useTranslation();
    const router = useRouter();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const data = await login(values.username, values.password);
            localStorage.setItem(ACCESS_TOKEN, data.access_token);

            message.success(t('login-page.message.success'));

            router.push('/learn');
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error(t('login-page.message.error'), errorInfo);
        message.error(t('login-page.message.fillAllFields'));
    };

    return (
        <div className="min-h-screen flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="w-[400px] bg-[#282828] p-10 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">{t('login-page.signIn')}</h2>
                    <Form
                        name="login"
                        layout="vertical"
                        className="w-full"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label={<span className="text-white">{t('login-page.placeholder.emailOrUsername')}</span>}
                            name="username"
                            rules={[{required: true, message: t('login-page.message.enterYourUsername')}]}
                        >
                            <Input
                                placeholder={t('login-page.placeholder.emailOrUsername')}
                                className="rounded-md bg-[#333333] text-white border-none"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-white">{t('login-page.placeholder.password')}</span>}
                            name="password"
                            rules={[{required: true, message: t('login-page.message.enterYourPassword')}]}
                        >
                            <Input.Password
                                placeholder={t('login-page.placeholder.password')}
                                className="rounded-md bg-[#333333] text-white border-none"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
                            >
                                {t('login-page.login')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-between w-full text-sm mt-2 text-gray-400">
                        <a href="#" className="hover:text-white">
                        {t('login-page.forgotPassword')}
                        </a>
                        <a href="/register" className="hover:text-green-400">
                        {t('login-page.signUp')}
                        </a>
                    </div>
                </div>
                <a href={'/learn'} className={'text-gray-500 text-sm mt-2'}>{t('login-page.continueAsGuest')}</a>
            </div>
        </div>
    );
}