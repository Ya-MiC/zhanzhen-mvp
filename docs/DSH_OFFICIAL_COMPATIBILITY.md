# DSH 官方相容性契約

## 已確認的官方模式

DSH 的 Web plugin 不是透過修改主程式 UI 加入。官方 client module system 會掃描由 Cordis Loader 啟用的 package；符合條件的 package 必須：

1. 在 `package.json` 宣告 `dsh.client`。
2. 指定 `platform: "web"`。
3. 將瀏覽器端 bundle 由 `exports["./client"]` 導出。
4. 保留 Host half，由 Loader 負責生命週期。

Host Loader 掛載 plugin 後，DSH Client Modules 會組合 boot graph、在 `/plugins` 提供 browser bundle，並按需載入。這不要求重新編譯整個 DSH Web UI。

## 本插件的邊界

- 名稱：`zhanzhen-dsh-local-office`。
- 顯示名：`湛箴工作區`。
- 僅註冊自己的右側 panel/side-card entry。
- 不覆蓋 `Files` 原有檔案面板。
- 不覆蓋官方 Office 預覽。
- 不注入任務看板。
- 不讀取、修改或依賴第三方任務看板、Agent 播報、睡眠保護插件。
- 不 patch DSH core、私有資料庫或未公開 internal API。

## 版本適配要求

DSH 的 package、slot 和 Remote API 仍可能隨版本演進。發布前必須在目標版本中做以下確認：

1. 找到官方公開的 right-panel / side-card slot。
2. 使用正式 Host-to-Client Remote/RPC contract 建立檔案選擇、樹讀取、讀檔與保存 API。
3. 以 `cordis.yml` 或該版本正式 user-plugin 設定掛載本 package。
4. 驗證 `dsh.client` bundle 被載入，且不與已啟用插件產生重複 module id。
5. 驗證重啟 DSH 後 binding metadata 可恢復。

## 為什麼不直接操作 Files 面板

你的需求是「對話右側的 Obsidian 式導航與編輯」。這應透過新增一張獨立的 `湛箴工作區` side card 實現，而非覆寫既有 `Files` 卡片；如此才不會破壞 DSH 檔案工作區或其他 Office preview plugin。
