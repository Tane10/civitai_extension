#! usr/bin/bash
echo "\033[43m Building... \033[0m"

node esbuild.config.js
# npm run build:css

echo "\033[42m Done.. \033[0m"
