# 湛箴 Zhanzhen · DSH 右側工作區 MVP

湛箴是安裝在 DeepSeek Harness（DSH）中的獨立 Web 插件。它只增加一個可嵌入對話右側的「湛箴工作區」面板，提供類 Obsidian 的本地文件導航、編輯與保存。

## 範圍

- 不修改 DSH 主導航。
- 不取代或覆蓋既有 Office 預覽插件。
- 不修改任務看板、Agent 播報或系統睡眠保護插件。
- MVP 優先支援 Markdown、TXT、CSV 的本地可編輯閉環。
- DOCX / XLSX 先採安全工作副本策略；未驗證高保真匯出前，不靜默覆蓋來源檔。

## 目標體驗

```text
選擇本地資料夾
  -> 文件樹 / Docs / Sheets 分類
  -> 在 DSH 對話右側開啟文件
  -> 編輯
  -> 800ms 自動保存或 Ctrl+S
  -> 關閉並重開 DSH
  -> 同一文件、同一內容、同一工作區仍可恢復
```

## DSH 官方相容性

本專案採 DSH 官方 Client/Host 雙半側模式：Host entry 位於 `src/index.ts`，瀏覽器端 entry 位於 `src/client/index.ts`；正式發行時必須在 `package.json` 使用 `dsh.client` 宣告並透過 `exports["./client"]` 提供 bundle。由 DSH Loader 掛載後，Client Modules 會發現並載入該 bundle。

完整規格請見：

- `docs/DSH_OFFICIAL_COMPATIBILITY.md`
- `docs/RIGHT_PANEL_MVP.md`

## 目前狀態

這是**架構與持久化核心 MVP**。它提供可測試的 file binding、工作副本、metadata、備份與原子保存邏輯；真正接入你安裝版本的 DSH 右側 slot 前，必須依該版本的正式 slot / remote API 實作 `src/client/index.ts` 的 host adapter。

不要把它稱為已完成的 Word 或 Excel 替代品。

## 本機資料位置

預設：

```text
%LOCALAPPDATA%\ZhanzhenDSH\
  projects\default\
    docs\
    sheets\
    metadata\bindings.json
  backups\
```

## 開發

```powershell
corepack enable
pnpm install
pnpm test
pnpm build
```

## 安全原則

- 使用者必須主動選擇資料夾或檔案。
- 所有工作副本都保留來源路徑與穩定 ID。
- 每次保存先建立備份，再以暫存檔原子替換工作副本。
- 原始 DOCX / XLSX 不會被靜默覆蓋。
