#!/bin/bash

# the directory to be removed
target="../ngx-radial-menu-demo/node_modules/ngx-radial-menu"

# delete the directory if it exists
if [ -d "$target" ]; then
    rm -rf "$target"
fi

cp -r ./dist/ngx-radial-menu "$target"
