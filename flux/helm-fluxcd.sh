https://lucas-stellet.github.io/noah-api/

# Install GitOps toolkit
flux bootstrap github \
  --owner=$GITHUB_USER \
  --repository=noah-api \
  --branch=master \
  --path=cluster/lkp 

# Define a chart source
flux create source helm api \
  --url=https://lucas-stellet.github.io/noah-api \
  --interval=1m

# Create a HelmRelease with a chart from a HelmRepository source
flux create hr api \
  --interval=1m \
  --source=HelmRepository/api \
  --chart=noah\
  --chart-version=">=0.1.0"

# Create a source from a public Helm repository
flux create source helm podinfo \
  --url=https://stefanprodan.github.io/podinfo \
  --interval=10m

# Create a HelmRelease with a chart from a HelmRepository source
flux create hr podinfo \
  --interval=10m \
  --source=HelmRepository/podinfo \
  --chart=podinfo \
  --chart-version=">4.0.0"
