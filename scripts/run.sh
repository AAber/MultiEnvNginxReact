#!/bin/bash

docker run --name test -e ENVIRONMENT=production -d -p 8080:8080 multi-env-nginx-react:latest
docker logs test