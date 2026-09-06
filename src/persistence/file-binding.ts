import { createHash, randomUUID } from 'node:crypto'
import { copyFile, mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, extname, join, resolve } from 'node:path'

export type FileKind = 'document' | 'sheet'

export interface FileBinding {
  id: string
  projectId: string
  sourcePath: string
  workingPath: string
  kind: FileKind
  extension: string
  createdAt: string
  updatedAt: string
  sourceFingerprint: string
}

export class FileBindingService {
  readonly root: string
  readonly projectId: string

  constructor(root = join(homedir(), 'AppData', 'Local', 'ZhanzhenDSH'), projectId = 'default') {
    this.root = resolve(root)
    this.projectId = projectId
  }

  get projectRoot() {
    return join(this.root, 'projects', this.projectId)
  }

  classify(path: string): FileKind {
    const extension = extname(path).toLowerCase()
    if (['.md', '.markdown', '.txt', '.docx'].includes(extension)) return 'document'
    if (['.csv', '.xlsx'].includes(extension)) return 'sheet'
    throw new Error(`Unsupported file type: ${extension || '(no extension)'}`)
  }

  async create(sourcePath: string): Promise<FileBinding> {
    const absoluteSource = resolve(sourcePath)
    const kind = this.classify(absoluteSource)
    const extension = extname(absoluteSource).toLowerCase()
    const id = randomUUID()
    const bucket = kind === 'document' ? 'docs' : 'sheets'
    const workingPath = join(this.projectRoot, bucket, `${id}${extension}`)
    const [bytes, info] = await Promise.all([readFile(absoluteSource), stat(absoluteSource)])
    await mkdir(dirname(workingPath), { recursive: true })
    await copyFile(absoluteSource, workingPath)
    const now = new Date().toISOString()
    return {
      id,
      projectId: this.projectId,
      sourcePath: absoluteSource,
      workingPath,
      kind,
      extension,
      createdAt: now,
      updatedAt: now,
      sourceFingerprint: createHash('sha256').update(bytes).update(String(info.mtimeMs)).digest('hex'),
    }
  }

  async read(binding: FileBinding): Promise<Buffer> {
    return readFile(binding.workingPath)
  }

  async save(binding: FileBinding, content: string | Buffer): Promise<FileBinding> {
    await this.backup(binding)
    await mkdir(dirname(binding.workingPath), { recursive: true })
    const temporary = `${binding.workingPath}.${randomUUID()}.tmp`
    await writeFile(temporary, content)
    await rename(temporary, binding.workingPath)
    return { ...binding, updatedAt: new Date().toISOString() }
  }

  private async backup(binding: FileBinding): Promise<void> {
    try {
      await stat(binding.workingPath)
    } catch {
      return
    }
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const destination = join(this.root, 'backups', this.projectId, binding.id, `${stamp}${binding.extension}`)
    await mkdir(dirname(destination), { recursive: true })
    await copyFile(binding.workingPath, destination)
  }
}
