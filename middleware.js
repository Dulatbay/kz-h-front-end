import {NextResponse} from 'next/server';
import i18n from "./i18n/i18n";
import {languages} from "./i18n/setting";


export function middleware(request) {
    const {pathname} = request.nextUrl;
    console.log(pathname);
    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}`)
    );

    if (pathnameIsMissingLocale) {
        const locale = i18n.language;

        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Применяем middleware ко всем маршрутам
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
