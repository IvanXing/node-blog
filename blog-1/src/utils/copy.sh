#!/bin/sh
cd /Users/[myname]/MyProject/Blog-Node/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log