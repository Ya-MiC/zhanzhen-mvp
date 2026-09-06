# 湛箴右側面板 MVP

## 一句話

在 DSH 對話右側提供一個 Obsidian 式本地 Docs / Sheets 工作區：選取資料夾、瀏覽本地文件樹、開啟、編輯、保存，重啟後仍然一致。

## 視覺區塊

```text
湛箴工作區
├─ 最近使用
├─ 文件
├─ 表格
├─ 收藏
├─ 搜尋
├─ 文件樹
├─ 編輯區
└─ 保存狀態列
```

使用你的湛箴色彩 token：

```text
藕粉：#E2A2AC
深灰紫：#594C57
淺薄荷：#E0F0E9
```

## MVP 行為

### 文件

- `.md` / `.markdown` / `.txt`：可直接作為文本工作副本編輯。
- `.docx`：建立工作副本，導入/導出層完成前不得宣稱高保真 round-trip。

### 表格

- `.csv`：可在 MVP 表格 editor 中編輯，保存為工作副本。
- `.xlsx`：建立工作副本；接入 Univer、SheetJS/ExcelJS 後才允許經測試的匯出。

### 保存

- 停止輸入 800ms 後請求 autosave。
- Ctrl+S 立即保存。
- 每次保存先備份舊工作副本。
- 暫存檔寫入成功後再原子 rename。
- metadata 記錄 id、source path、working path、類型、時間、fingerprint。
- 來源 Office 檔不允許靜默覆蓋。

## 不屬於 MVP

- AI 對話、Agent、OCR、同步、多人協作。
- 對原始 `.docx` / `.xlsx` 的無提示覆蓋保存。
- 修改任務看板或 DSH 主導航。

## 驗收

1. 使用者可在右側打開 `湛箴工作區`。
2. 使用者可選取本機資料夾，看到分類後的文件樹。
3. 使用者可開啟與修改 `.md` / `.txt` / `.csv`。
4. 自動保存與 Ctrl+S 均寫入工作副本。
5. 原始檔保持不變。
6. 關閉並重啟 DSH 後，最近文件和工作副本可恢復。
7. 既有 Files、Office Preview、任務看板及 Sidebar QA 不受影響。
