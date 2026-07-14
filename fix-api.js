const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/adventureCategory/g, 'homepageAdventureCard');
  // Handle the destructuring variables from POST/PUT requests
  content = content.replace(/const { title, slug, description, image, imageAlt, icon, isActive, isFeatured, linkType, activitySlug, customUrl } = body;/g, 
    'const { title, subtitle, description, coverImage, iconType, icon, buttonText, buttonLink, status } = body;');
    
  // Handle data mapping
  content = content.replace(/data: {\n\s*title,\n\s*slug,\n\s*description,\n\s*image,\n\s*imageAlt,\n\s*icon,\n\s*isActive,\n\s*isFeatured,\n\s*linkType,\n\s*activitySlug,\n\s*customUrl,\n\s*displayOrder: newDisplayOrder,\n\s*}/g, 
    'data: { title, subtitle, description, coverImage, iconType, icon, buttonText, buttonLink, status, displayOrder: newDisplayOrder }');

  content = content.replace(/data: {\n\s*title,\n\s*slug,\n\s*description,\n\s*image,\n\s*imageAlt,\n\s*icon,\n\s*isActive,\n\s*isFeatured,\n\s*linkType,\n\s*activitySlug,\n\s*customUrl,\n\s*}/g, 
    'data: { title, subtitle, description, coverImage, iconType, icon, buttonText, buttonLink, status }');
    
  fs.writeFileSync(filePath, content);
}

replaceInFile('app/api/admin/homepage-cards/route.ts');
replaceInFile('app/api/admin/homepage-cards/[id]/route.ts');
replaceInFile('app/api/admin/homepage-cards/reorder/route.ts');

