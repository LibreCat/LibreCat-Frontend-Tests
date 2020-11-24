#!/usr/bin/env bash
echo "Running Cypress e2e tests headlessly without copying files"

# explanation of the "docker run" command line arguments
#
#  --rm         = remove container when exited
#  -it          = interactive terminal
#  -v $PWD:/e2e = map current folder to /e2e inside the container
#  -w /e2e      = set working directy to /e2e
#  $@           = pass any arguments to this script to the Cypress command
#                 like "./cy-run.sh --record"
#
# Docker image "cypress/included:3.2.0" has its entrypoint
# set to "cypress run" by default
docker run --rm -it -v $PWD:/e2e -w /e2e cypress/included:6.0.0 --config baseUrl=http://host.docker.internal:5001 $@

# IMPORTANT!!!
# To make this work, make sure to also set this line in config/catmandu.local.yaml
# uri_base: "http://host.docker.internal:5001"

# if you need to restrict amount of memory or CPU power the
# container can use, see
# https://docs.docker.com/config/containers/resource_constraints/
# restrict total memory
# --memory=600m --memory-swap=600m
# restrict CPU share
# --cpus=0.3
