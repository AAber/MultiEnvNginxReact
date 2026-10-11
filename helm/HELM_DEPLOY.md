# Helm Deployment Guide

## Prerequisites

- [Helm 3](https://helm.sh/docs/intro/install/) installed
- A running Kubernetes cluster
- `kubectl` configured to point at your cluster

## Chart Location

```
helm/multienv-nginx-react/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── _helpers.tpl
    ├── deployment.yaml
    ├── service.yaml
    └── ingress.yaml
```

## Values

| Key | Default | Description |
|-----|---------|-------------|
| `replicaCount` | `1` | Number of pod replicas |
| `image.repository` | `aaber/multienv-nginx-react` | Container image repository |
| `image.tag` | `latest` | Container image tag |
| `image.pullPolicy` | `IfNotPresent` | Image pull policy |
| `environment` | `production` | Value injected as `ENVIRONMENT` env var into NGINX |
| `service.type` | `ClusterIP` | Kubernetes service type |
| `service.port` | `8080` | Service port |
| `ingress.enabled` | `false` | Enable Ingress resource |
| `ingress.host` | `""` | Ingress hostname |
| `ingress.annotations` | `{}` | Ingress annotations |

## Install

```bash
helm install <release-name> ./helm/multienv-nginx-react --set environment=<env>
```

Examples:

```bash
# staging
helm install staging ./helm/multienv-nginx-react --set environment=staging

# production
helm install production ./helm/multienv-nginx-react --set environment=production
```

## Upgrade

```bash
helm upgrade <release-name> ./helm/multienv-nginx-react --set environment=<env>
```

## Uninstall

```bash
helm uninstall <release-name>
```

## Enable Ingress

```bash
helm install production ./helm/multienv-nginx-react \
  --set environment=production \
  --set ingress.enabled=true \
  --set ingress.host=myapp.example.com
```

## ArgoCD Integration

### Via CLI

```bash
argocd app create multienv-nginx-react \
  --repo https://github.com/AAber/MultiEnvNginxReact.git \
  --path helm/multienv-nginx-react \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default \
  --helm-set environment=production
```

### Via Application Manifest

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: multienv-nginx-react
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/AAber/MultiEnvNginxReact.git
    targetRevision: HEAD
    path: helm/multienv-nginx-react
    helm:
      values: |
        environment: production
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Apply it with:

```bash
kubectl apply -f <your-argocd-app.yaml>
```

## Verify Deployment

```bash
# check pods are running
kubectl get pods -l app=<release-name>-multienv-nginx-react

# test the environment endpoint
kubectl port-forward svc/<release-name>-multienv-nginx-react 8080:8080
curl http://localhost:8080/api/environment
```

Expected response:

```
Environment: production
```
