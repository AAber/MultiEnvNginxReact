#!/bin/bash

docker run -e ENVIRONMENT=production -d -p 8080:8080 react-multi-env:latest
