# 个人主页

本目录下每个 JSON 文件对应一个个人主页，访问地址：`/people/<id>`（中文）、`/people/<id>/en`（英文）、`/people/<id>/ja`（日文）。所有页面在构建时静态预生成——**新增一个文件即自动生成对应页面**。

---

## 总览：怎么把这件事做完

整个流程可以拆成四个阶段，每个阶段有明确的产出物：

| 阶段 | 做什么 | 产出 |
|------|--------|------|
| 1. 准备 | 拉分支、读示例 | 一个干净的 working branch |
| 2. 填写 | 创建你的 JSON、放头像 | `data/people/<id>.json` + 可选头像 |
| 3. 验证 | 本地预览、过 checklist | 页面渲染符合预期，无构建错误 |
| 4. 合入 | 提交、推 PR、等 CI | 一个 green、可 merge 的 PR |

下面逐步展开。

---

## 阶段 1 · 准备

```bash
git checkout main
git pull
git checkout -b add/<你的id>      # 如 add/yang_qi
```

读两个参照文件，理解 schema：
- `_template.json` — 完整字段 + 注释，是 schema 源头
- `yang_qi.json` — 最小可用实例，建议从这里复制起步

---

## 阶段 2 · 填写

### 2.1 创建 JSON

```bash
cp data/people/yang_qi.json data/people/<你的id>.json
```

然后编辑 `data/people/<你的id>.json`。文件名规则见「硬性约束」。

### 2.2 字段填写指引

每个字段写什么、写多长、什么风格，参考下表：

| 字段 | 写什么 | 长度/风格 | 示例 |
|------|--------|-----------|------|
| `id` | 拼音名，与文件名一致 | 小写 + `_`/`-` | `yang_qi` |
| `name.zh` | 中文姓名 | — | `杨旗` |
| `name.en` | 英文名（姓在后） | 可选 | `Yang Qi` |
| `name.ja` | 日文名（留学生可填） | 可选 | `楊 旗` |
| `photo` | 头像路径 | `/people/<id>.jpg` | `/people/yang_qi.jpg` |
| `title.zh` | 身份 + 入学年份 | 一行 | `硕士研究生 · 2024 级` |
| `tagline.zh` | 核心定位一句话 | ≤20 字，不带句号 | `H!NT Lab · 多智能文档理解` |
| `links.*` | 个人链接 | 想露哪个填哪个 | github / email / scholar / homepage |
| `about.zh` | 自我介绍段落 | 每段 2–4 句，2–4 段为宜 | 见示例 |
| `research.zh` | 研究方向/兴趣点 | 每条一个短语 | `多智能体文档理解` |
| `publications` | 代表论文（不必全列） | 3–8 篇即可，按年份倒序 | 见 schema |
| `projects` | 参与的项目 | 名称 + 一句简介 + 链接 | 见 schema |

**写作风格建议**：
- `about`：第一段写身份与背景（学校、年级、何时加入实验室）；第二段写研究兴趣与动机；之后可加实习/获奖/开源经历。避免空泛的形容词，多用具体的事实。
- `research`：写「研究主题」而非「正在做的任务」。例如写「医学 RAG 深度推理」而不是「跑某个 baseline」。
- `publications`：只放你想让人看到的代表作。`href` 尽量给 open-access 链接（arXiv / ACL Anthology）。

### 2.3 头像（可选）

```bash
# 把照片放到 public/people/<你的id>.jpg
cp ~/Downloads/avatar.jpg public/people/<你的id>.jpg
```

- 推荐 400×400 以上的正方形 JPG/PNG/WEBP。
- 文件名**必须**与 `id` 一致。
- 不放头像会自动用姓名首字母占位，也很干净。

---

## 阶段 3 · 验证

### 3.1 本地预览

```bash
npm install        # 首次或依赖更新后
npm run dev
```

浏览器访问 `http://localhost:3000/people/<你的id>`，逐板块核对：
- 姓名与身份显示正确
- 没有意外出现的空板块
- 链接点击正常跳转
- 切换语言（右上角）后回退逻辑符合预期（未填外语应回退中文）

### 3.2 构建自检

```bash
npm run build
```

构建必须通过。常见的失败原因见下方「常见坑」。

### 3.3 Pre-PR Checklist

提交 PR 前自检：

- [ ] `id` 字段值 = 文件名（不含 `.json`）
- [ ] 文件名全小写 ASCII，无中文/空格
- [ ] 头像文件名（如有）= `id`
- [ ] `name.zh` 已填
- [ ] 多语言字段至少填了 `zh`
- [ ] 没有修改 `_template.json`
- [ ] 没有改动他人文件（除非协调过）
- [ ] JSON 格式合法（无尾逗号、双引号闭合）
- [ ] `npm run build` 本地通过

---

## 阶段 4 · 合入

```bash
git add data/people/<你的id>.json
git add public/people/<你的id>.jpg    # 如有头像
git commit -m "add: <你的姓名> 的个人主页"
git push -u origin add/<你的id>
```

然后在 GitHub 上向 `main` 发起 PR。PR 描述建议包含：
- 你的页面预览链接（`/people/<你的id>`）
- 是否新增了头像
- 是否需要从实验室主页学生表链接过来（如需要，请同时改 `i18n/{zh,en,ja}.json` 的 `students.rows`，参见 `yang_qi` 在那里的写法）

CI 通过、reviewer approve 后即可 merge。约 1–3 分钟后线上生效。

---

## 与 AI Coding 工具协作

如果你用 Codex / Claude Code / Cursor 等工具来生成 JSON，建议在 prompt 中包含：

1. **任务边界**：只创建/编辑 `data/people/<id>.json` 和（可选）`public/people/<id>.jpg`，不要动其他文件。
2. **Schema 来源**：让它读 `data/people/README.md` 的 Schema 章节 + `_template.json`。
3. **参照实例**：让它对照 `yang_qi.json` 的结构与字段密度。
4. **校验步骤**：让它跑 `npm run build` 自检，并把任何错误反馈给你。
5. **PR 输出**：让它按「阶段 4」的 commit message 规范提交。

参考 prompt（可按需调整）：

```
请帮我创建个人主页。任务：
1. 阅读 data/people/README.md 的 Schema 章节和 data/people/yang_qi.json
2. 创建 data/people/<我的id>.json，按 schema 填写以下信息：
   - id: ...
   - name: ...
   - about: ...
   - research: ...
   - publications: ...
   （把你的真实信息贴在这里）
3. 只改这一个文件，不要动 _template.json 和其他人的文件
4. 跑 npm run build 自检，若有错误修复后重试
5. 完成后告诉我 commit 命令
```

---

## 硬性约束

- **`id` 必须等于文件名（不含 `.json`）**。不一致时构建会直接报错。
- 文件名：小写 ASCII，单词间用 `_` 或 `-` 分隔。不要用中文或空格。
- 头像文件名必须匹配 `id`（如 `yang_qi.json` → `public/people/yang_qi.jpg`）。
- 不要修改 `_template.json`——它是 schema 的源头。
- 多语言字段：至少填 `zh`。`en` / `ja` 缺失或为空时自动回退到 `zh`。
- 内容字段全部可选。空数组 `[]` 或缺省的 key 会让对应板块自动隐藏。
- 改动只限于你自己的文件，除非协调过的重构。

---

## Schema

```ts
type Localized<T> = {
  zh: T;          // 必填
  en?: T;         // 可选，缺失时回退 zh
  ja?: T;         // 可选，缺失时回退 zh
};

type Person = {
  id: string;                       // 必须等于文件名
  photo?: string;                   // 如 "/people/yang_qi.jpg"
  name: Localized<string>;          // 必填
  title?: Localized<string>;        // 姓名下方的身份标签
  tagline?: Localized<string>;      // title 下方的一句话
  links?: {
    homepage?: string;
    github?: string;
    email?: string;                 // 渲染为 mailto:
    scholar?: string;               // Google Scholar 链接
    twitter?: string;
  };
  about?: Localized<string[]>;      // 段落数组
  research?: Localized<string[]>;   // 列表项
  publications?: Array<{
    year?: string;
    title: string;                  // 必填
    authors?: string;
    venue?: string;                 // 会议 / 期刊
    href?: string;                  // 链接地址，使标题可点击
  }>;
  projects?: Array<{
    name: string;                   // 必填
    description?: Localized<string>;
    href?: string;                  // 使卡片可点击
  }>;
};
```

## 最小骨架

```json
{
  "id": "<你的id>",
  "name": { "zh": "姓名", "en": "", "ja": "" },
  "title": { "zh": "硕士研究生 · 2024 级", "en": "", "ja": "" },
  "tagline": { "zh": "H!NT Lab · 研究方向", "en": "", "ja": "" },
  "links": { "github": "", "email": "" },
  "about": { "zh": ["一段简介。"], "en": [], "ja": [] },
  "research": { "zh": ["方向一"], "en": [], "ja": [] }
}
```

---

## 常见坑

| 症状 | 原因 | 解决 |
|------|------|------|
| 构建 error: `id mismatch` | JSON 内 `id` 与文件名不一致 | 改其中一个，使两者相同 |
| 页面 404 | 文件名以 `_` 或 `.` 开头被忽略 | 重命名为正常文件名 |
| 某板块没显示 | 字段为空数组 `[]` 或缺省 | 这是预期行为；若想显示则填内容 |
| 切换到 en 后内容还是中文 | `en` 字段为空，已回退 `zh` | 填入 `en` 内容即可 |
| 构建失败：JSON parse error | 尾逗号 / 单引号 / 引号未闭合 | 用 `npx prettier --write data/people/<id>.json` 或 jsonlint 校验 |
| 头像不显示 | 文件名与 `id` 不一致，或路径写错 | 核对文件名与 `photo` 字段 |
| 实验室主页学生表没我的链接 | 未在 `i18n/*.json` 配置 | 见「阶段 4」，改 `students.rows` |

---

## 渲染说明

- 板块按固定顺序渲染：about → research → publications → projects。空板块会被跳过。
- 文件名以 `_` 或 `.` 开头的会被页面生成器忽略（这就是为什么 `_template.json` 不会被当成页面）。
- 列表页（如 `/people/wang_hao` 上的学生表）只在 `i18n/{zh,en,ja}.json` 里手动配置后才会链接到你的页面——参见 `yang_qi` 在那里的引用方式。如需从实验室主页链到你的页面，请在 PR 中一并修改。
