#!/usr/bin/env node

import { CLI } from './cli/index';

async function main() {
  const cli = new CLI();
  await cli.run();
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}
