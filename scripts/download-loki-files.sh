#!/usr/bin/env bash
set -e

if [ -z "${CIRCLE_TOKEN}" ]; then
    echo "ERROR: Cannot access CircleCI without CircleCI API token. Please set CIRCLE_TOKEN environmental variable."
    exit 1
fi

curl https://circleci.com/api/v1.1/project/github/cloudify-cosmo/cloudify-ui-components/latest/artifacts?circle-token=${CIRCLE_TOKEN} \
   | grep -o 'https://[^"]*' \
   | sed -e "s/\(.*\(.loki.*\)\)/curl \1?circle-token=${CIRCLE_TOKEN} --create-dirs --output \2/" \
   | while read line; do echo "$line"; $line; done
