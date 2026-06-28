"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

type LangSwitchProps = {
    /** site = 首页导航；about = 王老师页面三语切换；person = 学生/成员页面三语切换 */
    scope?: 'site' | 'about' | 'person';
    /** 仅 scope='person' 时使用，对应 data/people/<id>.json 的 id */
    personId?: string;
    /** 'dark' = hero 深色背景, 'light' = 白色背景页面 */
    theme?: 'dark' | 'light';
};

export default function LangSwitch({ scope = 'site', personId, theme = 'dark' }: LangSwitchProps) {
    const pathname = usePathname();

    const routes: { zh: string; en: string; ja: string } =
        scope === 'about'
            ? { zh: '/people/wang_hao', en: '/people/wang_hao/en', ja: '/people/wang_hao/ja' }
            : scope === 'person' && personId
                ? { zh: `/people/${personId}`, en: `/people/${personId}/en`, ja: `/people/${personId}/ja` }
                : { zh: '/', en: '/en', ja: '/ja' };

    const scopeKey = scope === 'about' ? 'about' : scope === 'person' && personId ? 'person' : 'site';
    const current: 'zh' | 'en' | 'ja' = scopeKey === 'about'
        ? (pathname.startsWith('/people/wang_hao/ja') ? 'ja' : pathname.startsWith('/people/wang_hao/en') ? 'en' : 'zh')
        : scopeKey === 'person'
            ? (pathname.startsWith(`/people/${personId}/ja`) ? 'ja' : pathname.startsWith(`/people/${personId}/en`) ? 'en' : 'zh')
            : (pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ja') ? 'ja' : 'zh');

    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!open) return;
            const target = e.target as Node;
            if (menuRef.current && !menuRef.current.contains(target) && btnRef.current && !btnRef.current.contains(target)) {
                setOpen(false);
            }
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const currentLabel = current === 'zh' ? '中文' : current === 'en' ? 'EN' : '日本語';

    return (
        <div className={`lang-dropdown${theme === 'light' ? ' lang-dropdown-light' : ''}`}>

            <button ref={btnRef} className="btn btn-outline btn-inline" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>
                <Image src="/language-svgrepo-com.svg" alt="H!NT Lab" width={20} height={20} />
                {currentLabel}
                <ChevronDown size={16} className="lang-caret" />
            </button>
            {open && (
                <div ref={menuRef} className="lang-menu" role="menu">

                    <Link role="menuitem" href={routes.zh} aria-current={current === 'zh' ? 'page' : undefined} onClick={() => setOpen(false)}>中文</Link>
                    <Link role="menuitem" href={routes.en} aria-current={current === 'en' ? 'page' : undefined} onClick={() => setOpen(false)}>EN</Link>
                    <Link role="menuitem" href={routes.ja} aria-current={current === 'ja' ? 'page' : undefined} onClick={() => setOpen(false)}>日本語</Link>
                </div>
            )}
        </div>
    );
}

