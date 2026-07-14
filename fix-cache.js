const fs = require('fs');

const files = [
  'app/api/admin/homepage-cards/route.ts',
  'app/api/admin/homepage-cards/[id]/route.ts',
  'app/api/admin/homepage-cards/reorder/route.ts',
  'app/api/admin/contact-info/route.ts',
  'app/api/admin/categories/route.ts',
  'app/api/admin/categories/[id]/route.ts',
  'app/api/admin/categories/reorder/route.ts'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Add import if not present
  if (!content.includes('import { revalidatePath }')) {
    content = content.replace(
      'import { NextResponse } from "next/server";',
      'import { NextResponse } from "next/server";\nimport { revalidatePath } from "next/cache";'
    );
    content = content.replace(
      'import { NextRequest, NextResponse } from "next/server";',
      'import { NextRequest, NextResponse } from "next/server";\nimport { revalidatePath } from "next/cache";'
    );
  }

  // Insert revalidatePath before return NextResponse.json for 201 or successful ops
  content = content.replace(
    /return NextResponse\.json\([^,]+,\s*\{\s*status:\s*201\s*\}\);/g,
    'revalidatePath("/", "layout");\n    $&'
  );

  content = content.replace(
    /return NextResponse\.json\((?!\{\s*error)[^)]+\);/g,
    'revalidatePath("/", "layout");\n    $&'
  );

  fs.writeFileSync(file, content);
}
console.log("Done updating revalidatePath");
