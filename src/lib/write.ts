import fs from 'fs';

class Writer {
  private outDir: string;

  constructor(outDir = '.') {
    this.outDir = outDir;

    if (outDir !== '.') {
      try {
        fs.readdirSync(outDir);
      } catch {
        fs.mkdirSync(outDir);
      }
    }
  }

  write({ data, name }: { data: unknown, name: string }): void {
    try {
      fs.writeFileSync(`${this.outDir}/${name}.json`, JSON.stringify(data, null, 2));
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Writer;
