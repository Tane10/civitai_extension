#! usr/bin/bash
echo "\033[43m Building... \033[0m"

node esbuild.config.js

cp ./src/index.html dist

cp ./public/* dist

cp ./css/* dist

echo "\033[42m Done.. \033[0m"
