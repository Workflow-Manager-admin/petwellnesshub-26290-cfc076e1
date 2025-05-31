#!/bin/bash
cd /home/kavia/workspace/code-generation/petwellnesshub-26290-cfc076e1/petwellnesshub_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

