import fs from 'fs';
import path from 'path';

export type Locale = 'zh' | 'en' | 'ja';

/** 多语言字段：en/ja 缺失时回退到 zh */
export type Localized<T = string> = {
  zh: T;
  en?: T;
  ja?: T;
};

export type PersonLinks = {
  homepage?: string;
  github?: string;
  email?: string;
  scholar?: string;
  twitter?: string;
};

export type Publication = {
  year?: string;
  title: string;
  authors?: string;
  venue?: string;
  href?: string;
};

export type PersonProject = {
  name: string;
  description?: Localized<string>;
  href?: string;
};

export type Person = {
  id: string;
  photo?: string;
  name: Localized<string>;
  title?: Localized<string>;
  tagline?: Localized<string>;
  links?: PersonLinks;
  about?: Localized<string[]>;
  research?: Localized<string[]>;
  publications?: Publication[];
  projects?: PersonProject[];
};

const PEOPLE_DIR = path.join(process.cwd(), 'data', 'people');

function isTemplate(name: string) {
  return name.startsWith('_') || name.startsWith('.');
}

/** 读取 data/people/ 目录下的所有 .json 文件名（去掉扩展名），排除模板/隐藏文件 */
export function listPersonIds(): string[] {
  if (!fs.existsSync(PEOPLE_DIR)) return [];
  return fs
    .readdirSync(PEOPLE_DIR)
    .filter((f) => f.endsWith('.json') && !isTemplate(f))
    .map((f) => f.replace(/\.json$/, ''));
}

/** 判断某个 id 是否有对应的个人页面 */
export function hasPersonPage(id: string): boolean {
  if (!id) return false;
  const file = path.join(PEOPLE_DIR, `${id}.json`);
  return fs.existsSync(file);
}

/** 读取单个 person 的原始 JSON */
export function getPerson(id: string): Person | null {
  const file = path.join(PEOPLE_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as Person;
  if (raw.id !== id) {
    // 文件内 id 必须与文件名一致，避免 URL 不匹配
    throw new Error(`[people] id mismatch: ${file} 内 "id"="${raw.id}"，但文件名为 "${id}.json"`);
  }
  return raw;
}

/** 取多语言字段，按 zh → en → ja 优先级回退（en/ja 未提供则回退 zh） */
export function pick<T>(field: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!field) return undefined;
  if (locale === 'zh') return field.zh;
  const v = field[locale];
  if (v === undefined || v === null) return field.zh; // 回退
  // 数组/字符串空值也回退
  if ((typeof v === 'string' || Array.isArray(v)) && (v as any).length === 0) return field.zh;
  return v;
}
