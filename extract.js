const fs = require('fs');
const readline = require('readline');

async function extractFiles() {
  const logPath = '/Users/dhyey/.gemini/antigravity-ide/brain/379eef3e-f189-4f62-9ae2-f131970c8189/.system_generated/logs/transcript.jsonl';
  
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('export function HeroSection') && line.includes('TOOL_RESPONSE')) {
       // Parse the JSON step
       try {
         const step = JSON.parse(line);
         if (step.source === 'ENVIRONMENT' && step.type === 'TOOL_RESPONSE') {
             fs.appendFileSync('all_hero_states.txt', "--- NEW MATCH ---\n" + step.content + "\n\n");
         }
       } catch(e) {}
    }
  }
}

extractFiles();
