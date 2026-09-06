export interface ZhanzhenFileRow {
  id: string
  name: string
  kind: 'document' | 'sheet'
  saved: boolean
}

export interface ZhanzhenRightPanelModel {
  activeSection: 'recent' | 'docs' | 'sheets' | 'starred'
  files: ZhanzhenFileRow[]
  activeFileId?: string
}

/**
 * Framework-neutral panel model for the DSH right-side mount.
 * A DSH-version-specific React adapter should render this model inside the
 * officially provided right-panel/side-card slot.
 */
export function ZhanzhenRightPanel(model: ZhanzhenRightPanelModel) {
  const active = model.files.find((file) => file.id === model.activeFileId)
  return {
    title: '湛箴工作區',
    sections: [
      { id: 'recent', label: '最近使用' },
      { id: 'docs', label: '文件' },
      { id: 'sheets', label: '表格' },
      { id: 'starred', label: '收藏' },
    ],
    activeSection: model.activeSection,
    files: model.files,
    activeFile: active,
    actions: ['選擇資料夾', '新建文件', '新建表格', '重新整理', '搜尋', '保存', '另存副本'],
    status: active ? (active.saved ? '✓ 已保存到本機' : '● 有未保存修改') : '尚未開啟文件',
  }
}
