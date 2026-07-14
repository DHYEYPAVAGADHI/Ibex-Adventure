const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./app/api/admin', function(filePath) {
  if (filePath.endsWith('route.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Check if revalidatePath is imported
    if (!content.includes('revalidatePath')) {
      content = 'import { revalidatePath } from "next/cache";\n' + content;
      changed = true;
    }

    // Replace return NextResponse.json(...) with revalidatePath('/', 'layout'); return NextResponse.json(...)
    // Only in POST, PUT, PATCH, DELETE
    const regex = /(return NextResponse\.json\([^;]+;)/g;
    content = content.replace(regex, (match, p1, offset, string) => {
      // Very basic heuristic: if it's returning a 2xx or not an error, we revalidate
      // Let's just do it for all non-GET successful returns
      if (string.substring(Math.max(0, offset - 100), offset).includes('catch')) {
        return match; // inside catch block, don't revalidate
      }
      if (match.includes('400') || match.includes('401') || match.includes('404') || match.includes('500') || match.includes('error')) {
         return match;
      }
      changed = true;
      return `revalidatePath('/', 'layout');\n    ${match}`;
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
