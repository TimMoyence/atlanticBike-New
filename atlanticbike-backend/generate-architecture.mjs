// generate-architecture.mjs
import fs from 'fs';
import path from 'path';

const __dirname = process.cwd();

const modules = [
  'bike',
  'reservation',
  'user',
  'accessory',
  'rental-pack',
  'repair',
  'review',
];

const baseDirs = [
  'domain',
  'application',
  'infrastructure',
  'interfaces',
  'interfaces/entities',
];

function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created: ${dir}`);
  }
}

function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✏️  Created file: ${filePath}`);
  }
}

function createModuleStructure(moduleName) {
  const modulePath = path.join(__dirname, 'src', 'modules', moduleName);
  createDirIfNotExists(modulePath);

  for (const subDir of baseDirs) {
    const subPath = path.join(modulePath, subDir);
    createDirIfNotExists(subPath);
  }

  // Domain files
  createFile(
    path.join(modulePath, 'domain', `${capitalize(moduleName)}.ts`),
    `export class ${capitalize(moduleName)} {\n  id: number;\n}\n`,
  );
  createFile(
    path.join(modulePath, 'domain', `I${capitalize(moduleName)}Repository.ts`),
    `export interface I${capitalize(
      moduleName,
    )}Repository {\n  findAll(): Promise<${capitalize(moduleName)}[]>;\n}\n`,
  );

  // Application files
  createFile(
    path.join(
      modulePath,
      'application',
      `Create${capitalize(moduleName)}UseCase.ts`,
    ),
    `import { I${capitalize(moduleName)}Repository } from "../domain/I${capitalize(
      moduleName,
    )}Repository";\n\nexport class Create${capitalize(
      moduleName,
    )}UseCase {\n  constructor(private repo: I${capitalize(
      moduleName,
    )}Repository) {}\n  async execute(data: any) {\n    return this.repo.create(data);\n  }\n}\n`,
  );

  // Infrastructure files
  createFile(
    path.join(
      modulePath,
      'infrastructure',
      `${capitalize(moduleName)}RepositoryTypeORM.ts`,
    ),
    `import { Repository } from "typeorm";\nimport { ${capitalize(
      moduleName,
    )} } from "../domain/${capitalize(
      moduleName,
    )}";\nimport { I${capitalize(moduleName)}Repository } from "../domain/I${capitalize(
      moduleName,
    )}Repository";\n\nexport class ${capitalize(
      moduleName,
    )}RepositoryTypeORM implements I${capitalize(
      moduleName,
    )}Repository {\n  constructor(private readonly repo: Repository<${capitalize(
      moduleName,
    )}>) {}\n  async findAll() { return this.repo.find(); }\n  async create(data: any) { return this.repo.save(data); }\n}\n`,
  );

  // Interfaces files
  createFile(
    path.join(
      modulePath,
      'interfaces',
      `${capitalize(moduleName)}Controller.ts`,
    ),
    `import { Controller, Get, Post, Body } from "@nestjs/common";\nimport { Create${capitalize(
      moduleName,
    )}UseCase } from "../application/Create${capitalize(
      moduleName,
    )}UseCase";\n\n@Controller("${moduleName}")\nexport class ${capitalize(
      moduleName,
    )}Controller {\n  constructor(private readonly createUseCase: Create${capitalize(
      moduleName,
    )}UseCase) {}\n\n  @Get()\n  findAll() { return []; }\n\n  @Post()\n  create(@Body() dto: any) { return this.createUseCase.execute(dto); }\n}\n`,
  );
}

function capitalize(str) {
  return (
    str.charAt(0).toUpperCase() +
    str.slice(1).replace(/-./g, (x) => x[1].toUpperCase())
  );
}

console.log('🚀 Generating Hexagonal Architecture...');
modules.forEach(createModuleStructure);
console.log('✅ Done!');
