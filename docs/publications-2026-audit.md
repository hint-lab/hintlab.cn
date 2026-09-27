# 2026 年论文信息核对

核对日期：2026-09-27。范围为 `data/publications.json` 中归入 2026 年的 11 篇论文；同步维护 `public/papers.bib`。另为 2027 年 DSSG 已有的文章编号 123993 增加字段类型标记，避免新详情行将其误显示为页码；不更改该篇书目信息。

## 逐篇结果

| 论文 | 本次补充或确认 | 依据 / 尚缺内容 |
| --- | --- | --- |
| Multimodal Global Semantics-Based Triple-Fusion Branch Framework for Fake News Detection | 7 位作者、2026、1–15 页、DOI 和 IEEE 链接一致；标为在线发表 | [IEEE](https://ieeexplore.ieee.org/document/11711414)、[出版社提交的 Crossref 元数据](https://api.crossref.org/works/10.1109/TCSS.2026.3732070)。未分配卷期；不推测发布日期或通讯作者。 |
| Drift-Proof RAG | 保留用户提供的作者、Hao Wang 通讯作者和 BIBM 2026 / CCF-B；用独立字段记录已录用 | 本轮精确标题搜索和 Crossref 查询未找到相符的正式出版记录，仍缺 DOI、页码和公开论文链接。 |
| Deontic Drift | 保留两位作者、Hao Wang 通讯作者、SSCI Q1、2026-09-14 录用日期；页面显示录用日期 | [Sage Open](https://journals.sagepub.com/home/sgo)；本轮精确标题搜索和 Crossref 查询未找到相符记录，仍缺 DOI、卷期和文章编号。录用信息来自此前用户提供的资料。 |
| S2-CoGNN | 确认作者、352 卷、Part B、文章编号 116990、DOI；补出版社链接 | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0950705126017168)、[Crossref](https://api.crossref.org/works/10.1016/j.knosys.2026.116990)。Part B 沿用既有记录；Crossref 仅提供卷号，不能据此删除已知分册。 |
| Beyond Multi-Agent Translation | 补齐 6 位作者，替换作者 TODO / et al.；确认 Hao Wang 通讯作者；补 2026-06-24 录用和 2026-07-02 在线发表日期、出版社链接；BibTeX 移除过时的 Accepted 状态 | [Springer 正式页面](https://link.springer.com/article/10.1007/s10506-026-09529-2)、[Crossref](https://api.crossref.org/works/10.1007/s10506-026-09529-2)。尚未分配卷期页码。保留原 ID / BibTeX key，避免破坏既有锚点和引用。 |
| DeepTrans Studio | 确认全部 8 位作者与已录用 Demo 状态；补 arXiv PDF 和 eprint 信息；移除错误的 `pages = {4}` | [作者提交的 arXiv 记录](https://arxiv.org/abs/2606.29727)。“4 pages”是预印本长度，不是会议论文集页码。本轮未确认 ACM DOI 和正式分页，继续保留 arXiv。 |
| DeepMed Search | 网站补齐 DOI、8453–8457 页、官方 PDF；作者 JiaHang 大小写与会议记录一致；BibTeX 补通讯作者说明 | [IJCAI](https://www.ijcai.org/proceedings/2026/978)。 |
| BabelDOC | 补 DOI、253–262 页、2026-07 发表月份、官方 PDF、完整论文集名；BibTeX 补编辑、地点和通讯作者说明 | [ACL Anthology](https://aclanthology.org/2026.acl-demo.25/)。Anthology 将第一作者拆为 `Qi, Yang`；本站保留既有、用户确认的杨琪姓名 `Yang, Qi`，未自动交换姓与名。 |
| QAlign-RAG | 补 LNCS 16632 卷、163–175 页、2026-07-12 在线日期、Springer 链接；新增完整 BibTeX | [Springer](https://link.springer.com/chapter/10.1007/978-981-92-2852-2_13)、[Crossref](https://api.crossref.org/works/10.1007/978-981-92-2852-2_13)。在线/会议年份是 2026，出版社引用和纸本年份是 2027；网站仍归入 2026，同时显示纸本年份，BibTeX 使用出版社引用年份 2027 并注明在线日期。 |
| HeterMV | 补 63 卷、5 期、文章编号 104709、出版社链接；改用 journal 字段；新增 BibTeX，保留 Weimin Li 通讯作者标记 | [Crossref](https://api.crossref.org/works/10.1016/j.ipm.2026.104709)、[ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0306457326001007)。 |
| MoE-TextDiffuser | 补 677 卷、文章编号 133131、出版社链接；改用 journal 字段；新增 BibTeX；SCI Q2 更正为当前 JCR Q1，保留 CCF-C 与 Hao Wang 通讯作者 | [Crossref](https://api.crossref.org/works/10.1016/j.neucom.2026.133131)、[ScienceDirect](https://www.sciencedirect.com/science/article/pii/S092523122600528X)。 |

## 分区口径

- Q1 / Q2 指 JCR 学科分区，不代表中科院分区。此次没有添加中科院或新锐分区标签。
- Neurocomputing 最新公开 JCR 汇总为 SCIE / 人工智能 Q1（43/210，2026-06-17 发布）：[科研通](https://www.ablesci.com/journal/detail?id=5mNKeD)、[爱科学](https://www.iikx.com/sci/technology/15751.html)。据此纠正 2026 条目的旧 Q2 标签；[CCF 人工智能目录](https://www.ccf.org.cn/Academic_Evaluation/AI/)列为 C 类。
- Artificial Intelligence and Law 的 SCIE 人工智能、跨学科应用为 Q2，SSCI 法学为 Q1：[分学科记录](https://www.ablesci.com/journal/detail?id=DX0B8D)。保留 SCI Q2/SSCI Q1。
- Information Processing & Management 为 SCIE 信息系统 Q1、SSCI 图书情报 Q1：[分学科记录](https://www.ablesci.com/journal/detail?id=r8LYJr)。
- Knowledge-Based Systems Q1：[大学图书信息记录](https://www.iit.comillas.edu/publicacion/info_revista/en/783/Knowledge-Based_Systems)；Sage Open SSCI Q1：[大学图书信息记录](https://www.iit.comillas.edu/publicacion/info_revista/es/669/SAGE_Open)。既有标签不变。
- TCSS SCI Q2 / CCF-C 已在本轮任务前核对：[分区记录](https://www.ablesci.com/journal/detail?id=DX0E1D)、[CCF 官方条目](https://www.ccf.org.cn/Academic_Evaluation/Cross_Compre_Emerging/zgjsjxhtjgjxskw/cl/2023-03-09/787296.shtml)。
- JCR 数据来自公开汇总，未直接登录 Clarivate 官方订阅库。各条目保留已经明确的 CCF 标签；没有为查不到分类的期刊硬加 CCF 等级。
- ACL / CSCW / IJCAI 条目始终写明 Demo / System Demonstrations。CCF 字样表示会议级别，不等同于 Demo 论文被认定为对应等级的 full paper；BibTeX 的 note 已区分 conference 等级。[CCF 目录适用范围](https://www.ccf.org.cn/Academic_Evaluation/By_category/)。

## 页面与后续维护

- 中、英、日页面展示已有卷期、页码或文章编号、录用/发表日期和在线状态；文章编号不显示成页码。
- PDF、正式页面和 DOI 链接可同时显示，避免原来的互斥逻辑隐藏已补链接。
- 保留所有既有作者顺序及通讯作者星号，不从 Crossref 的作者排列推断通讯作者。
- 尚待正式出版信息的条目：TCSS（卷期）、BIBM（正式链接/DOI/页码）、Sage Open（正式链接/DOI/卷期/文章编号）、Beyond Multi-Agent Translation（卷期页码）、DeepTrans Studio（ACM DOI/正式分页）。
- 不运行 `scripts/convert-bib.mjs` 覆盖目录；它尚未支持本站全部状态、分类和日期字段。两份数据目前继续显式同步。
