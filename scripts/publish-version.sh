#!/usr/bin/env bash
set -e

NODE_MODULES_PATH="$( npm root )"
CREATE_VERSION_SCRIPT_PATH="${NODE_MODULES_PATH}/cloudify-ui-common/scripts/create-version.sh"

if [ ! -f "${CREATE_VERSION_SCRIPT_PATH}" ]; then
    echo "ERROR: Cloudify UI Common create-version.sh script not found."
    exit 1
fi
. "$CREATE_VERSION_SCRIPT_PATH"

createVersion "$@"
