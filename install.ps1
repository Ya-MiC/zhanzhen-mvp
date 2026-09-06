# Zhanzhen DSH plugin installer skeleton.
# It intentionally refuses to modify DSH until the target release's official
# user-plugin mount path and right-panel slot contract are configured.
$ErrorActionPreference = 'Stop'
$repo = 'https://github.com/Ya-MiC/zhanzhen-mvp.git'
$target = Join-Path $env:LOCALAPPDATA 'ZhanzhenDSH\plugin-source'

Write-Host '湛箴 DSH 右側工作區安裝器' -ForegroundColor Magenta
Write-Host '正在檢查 DSH 相容性…'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw '未找到 Git。請先安裝 Git for Windows，然後重新執行。'
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw '未找到 Node.js 20+。請先安裝 Node.js LTS，然後重新執行。'
}

if (Test-Path $target) {
  Write-Host '更新既有湛箴原始碼…'
  git -C $target pull --ff-only
} else {
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
  git clone $repo $target
}

Write-Warning @'
已下載湛箴 MVP 原始碼，但尚未自動掛載到 DSH。
原因：此版本庫尚未包含你本機 DSH release 所需的正式 right-panel slot 與 user-plugin mount adapter。

下一步必須先依 DSH 的「官方公開 plugin mount / cordis.yml」規範完成 adapter，再取消此保護。
本安裝器不會猜測 DSH 安裝目錄，也不會修改 DSH 核心或其他插件。
'@
Write-Host "原始碼位置：$target" -ForegroundColor Green
