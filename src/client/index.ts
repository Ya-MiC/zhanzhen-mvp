/**
 * Zhanzhen DSH Browser half.
 *
 * DSH discovers this built ./client bundle through package.json dsh.client.
 * The exact right-panel slot API must be imported from the installed DSH
 * version's official client package; keeping this boundary explicit prevents
 * overwriting the Files panel, task board, or any third-party sidebar plugin.
 */
export { ZhanzhenRightPanel } from './ZhanzhenRightPanel.js'
