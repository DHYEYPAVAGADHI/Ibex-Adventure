const fs = require('fs');
const readline = require('readline');

async function extractDiffs() {
  const logPath = '/Users/dhyey/.gemini/antigravity-ide/brain/379eef3e-f189-4f62-9ae2-f131970c8189/.system_generated/logs/transcript.jsonl';
  
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('replace_file_content') && line.includes('TargetContent')) {
       try {
         const step = JSON.parse(line);
         if (step.tool_calls) {
             for (const call of step.tool_calls) {
                 if (call.tool_args && call.tool_args.TargetFile && call.tool_args.TargetFile.includes('hero-section.tsx')) {
                     fs.appendFileSync('hero_diffs.json', JSON.stringify(call.tool_args, null, 2) + "\n\n");
                 }
             }
         }
       } catch(e) {}
    }
  }
}

extractDiffs();
