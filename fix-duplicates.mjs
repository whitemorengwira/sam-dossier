import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DOC_DIR = join(process.cwd(), 'public', 'documents', 'socinga-africa');

function fixFile(filePath) {
  let html = readFileSync(filePath, 'utf-8');
  
  // Find how many times <div class="enh-signing-section"> appears
  const parts = html.split('<div class="enh-signing-section">');
  
  if (parts.length > 2) {
    console.log(`Fixing duplicates in ${filePath}...`);
    // parts[0] is everything before the first signing section.
    // The very last part contains the newest signing section and the </body> tag.
    // Wait, the last part also contains the duplicated script tags maybe?
    // Let's reconstruct it manually.
    
    // We want to keep parts[0] (which ends right after the content)
    // and the last part (which is the newest signing section).
    // Wait, the new signing section has `<div class="enh-signing-section">` at the start of it.
    
    // Let's just find the last index of `<div class="enh-signing-section">`
    const lastIndex = html.lastIndexOf('<div class="enh-signing-section">');
    const firstIndex = html.indexOf('<div class="enh-signing-section">');
    
    if (firstIndex !== lastIndex) {
      // Remove everything between firstIndex and lastIndex
      html = html.substring(0, firstIndex) + html.substring(lastIndex);
    }
    
    // Now fix duplicated script tags
    // The script tags are `<script src="/document-engine.js"></script>\n    <script src="/signing-bridge.js"></script>`
    // They might appear multiple times. We only want them right before </body>
    html = html.replace(/<script src="\/document-engine\.js"><\/script>\s*<script src="\/signing-bridge\.js"><\/script>\s*/gi, '');
    
    // Add them back exactly once before </body>
    html = html.replace(/<\/body>/i, '    <script src="/document-engine.js"></script>\n    <script src="/signing-bridge.js"></script>\n</body>');
    
    writeFileSync(filePath, html, 'utf-8');
    console.log(` -> Fixed.`);
  }
}

const files = readdirSync(DOC_DIR).filter(f => f.endsWith('.html'));
files.forEach(f => fixFile(join(DOC_DIR, f)));
console.log('All files checked and fixed.');
