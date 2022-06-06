import type { AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../layouts/Main';
import '../assets/styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [ogUrl, setOgUrl] = useState('');

    useEffect(() => {
        const { host } = window.location;
        const baseUrl = `https://${host}`;
        const localePath = baseUrl + router.pathname + (router.locale === 'en' ? '' : router.locale);
        setOgUrl(localePath.replace(/\/$/, ''));
    }, [router.pathname, router.locale]);

    return (
        <Layout>
            <>
                <Head>
                    <title>{t('title')}</title>
                    <meta name="description" content={t('description')} />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="author" content={`${t('firstName')} ${t('lastName')}`} />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#227bb7" />
                    <meta name="robots" content="index, follow" />
                    <meta name="apple-mobile-web-app-title" content={t('applicationName')} />
                    <meta name="application-name" content={t('applicationName')} />
                    <meta name="msapplication-TileColor" content="#2b5797" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta property="og:title" content={t('title')} />
                    <meta property="og:description" content={t('description')} />
                    <meta property="og:url" content={ogUrl} />
                    <meta property="og:image" content="/apple-touch-icon.png" />
                    <meta property="og:site_name" content={t('applicationName')} />
                    <meta property="og:type" content="profile" />
                    <meta property="profile:first_name" content={t('firstName')} />
                    <meta property="profile:last_name" content={t('lastName')} />
                    <meta property="profile:username" content={t('userName')} />
                    <meta property="profile:gender" content={t('male')} />
                </Head>
                <Component {...pageProps} />
            </>
        </Layout>
    );
}

export default appWithTranslation(MyApp);
