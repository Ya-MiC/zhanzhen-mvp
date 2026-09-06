/**
 * Zhanzhen DSH Host half.
 *
 * This module intentionally has no guessed DSH-only service calls. The current
 * DSH release discovers a browser plugin from package.json dsh.client plus the
 * ./client export after this host package is mounted by the Cordis Loader.
 *
 * Add the verified host Remote API and right-panel slot registration for the
 * user's installed DSH release here. Do not patch DSH core or another plugin.
 */
export const name = 'zhanzhen-dsh-local-office'

export interface ZhanzhenPluginConfig {
  workspaceRoot?: string
  autosaveMs?: number
}

export function apply(_ctx: unknown, _config: ZhanzhenPluginConfig = {}) {
  // Host adapter boundary. Persistence implementation lives in src/persistence.
}
