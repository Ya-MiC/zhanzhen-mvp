import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { FileBinding } from './file-binding.js'
import { FileBindingService } from './file-binding.js'

interface BindingsIndex {
  version: 1
  bindings: Record<string, FileBinding>
}

export class WorkspaceStore {
  constructor(private readonly files: FileBindingService) {}

  private get indexPath() {
    return join(this.files.projectRoot, 'metadata', 'bindings.json')
  }

  async bind(sourcePath: string): Promise<FileBinding> {
    const binding = await this.files.create(sourcePath)
    const index = await this.load()
    index.bindings[binding.id] = binding
    await this.persist(index)
    return binding
  }

  async list(): Promise<FileBinding[]> {
    return Object.values((await this.load()).bindings).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  async get(id: string): Promise<FileBinding | undefined> {
    return (await this.load()).bindings[id]
  }

  async update(binding: FileBinding): Promise<void> {
    const index = await this.load()
    index.bindings[binding.id] = binding
    await this.persist(index)
  }

  private async load(): Promise<BindingsIndex> {
    try {
      return JSON.parse(await readFile(this.indexPath, 'utf8')) as BindingsIndex
    } catch {
      return { version: 1, bindings: {} }
    }
  }

  private async persist(index: BindingsIndex): Promise<void> {
    await mkdir(dirname(this.indexPath), { recursive: true })
    const temp = `${this.indexPath}.tmp`
    await writeFile(temp, JSON.stringify(index, null, 2), 'utf8')
    await rename(temp, this.indexPath)
  }
}
