import {NextResponse} from 'next/server';
import i18n from "./i18n/i18n";
import {languages} from "./i18n/setting";


export function middleware(request) {
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith("/mailru-verification")) return NextResponse.next();

    const {pathname, search} = request.nextUrl;
    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}`)
    );

    if (pathnameIsMissingLocale) {
        const cookieLocale = request.cookies.get('i18nextLng')?.value;
        const locale = cookieLocale || i18n.language;
        return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url));
    }

    if (pathname.split("/").length <= 1) {
        const locale = i18n.language;
        return NextResponse.redirect(new URL(`/${locale}/learn`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Применяем middleware ко всем маршрутам
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
