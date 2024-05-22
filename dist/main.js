import { setFailed, setOutput } from '@actions/core';
import { spawnSync } from 'node:child_process';
import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { summaryNoOutdated, summaryOutdated } from './util.js';
// For testing purposes; exports summary markdown to output.md file
if (process.env.NODE_ENV === 'development') {
    const CUR = path.dirname(url.fileURLToPath(import.meta.url));
    const SUMMARY_FILE = path.join(CUR, 'output.md');
    if (existsSync(SUMMARY_FILE)) {
        unlinkSync(SUMMARY_FILE);
    }
    writeFileSync(SUMMARY_FILE, '', 'utf8');
    process.env.GITHUB_STEP_SUMMARY = SUMMARY_FILE;
}
const main = async () => {
    try {
        const { stderr, stdout, status } = spawnSync('pnpm', ['outdated', '--format=json', '-r'], { cwd: process.cwd() });
        // Set github outputs
        setOutput('nodeStatusCode', status);
        setOutput('nodeStderr', stderr);
        // Process completed; packages are all up-to-date
        if (status === 0)
            return summaryNoOutdated();
        // Process terminated by PNPM; outdated packages
        if (status === 1) {
            return summaryOutdated(stdout.toString('utf8'));
        }
        else {
            const errorText = stderr.toString();
            throw new Error(errorText, { cause: status });
        }
    }
    catch (error) {
        setFailed(`Error: Action failed. StatusCode: ${error.cause}. Message: ${error.message}`);
    }
};
main();
