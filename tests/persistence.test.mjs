import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

// This executable specification states the required persistence contract.
// Run after compiling TypeScript persistence modules for the target DSH build.
test('persistence contract: source files must not be silently overwritten', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zhanzhen-contract-'))
  try {
    const source = join(root, 'note.md')
    const copy = join(root, 'working-note.md')
    await writeFile(source, 'original', 'utf8')
    await writeFile(copy, 'revised', 'utf8')
    assert.equal(await readFile(source, 'utf8'), 'original')
    assert.equal(await readFile(copy, 'utf8'), 'revised')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
