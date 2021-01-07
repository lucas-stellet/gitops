# USING YOUR OWN DEPLOY KEY

# Downluad FluxCD Helm (IF YOU HAVEN'T DOWNLOAD IT)
helm repo add fluxcd https://charts.fluxcd.io

# Create flucd namespace on cluster
kubectl create namespace fluxcd

# Generate a SSH key named identity
ssh-keygen -q -N "" -C "lkp@product" -f ./identity 

# Create a Kubernetes secret
kubectl -n fluxcd create secret generic flux-ssh --from-file=./identity

# Install FluxCD Chart on Cluster
helm upgrade -i flux fluxcd/flux -n fluxcd \
--set git.url=git@ssh.dev.azure.com:v3/lucasstellet/noah/noah \
--set git.secretName=flux-ssh \
--set git.secretDataKey=identity 

# Install HelmRelease Custom Resource Definition 
kubectl apply -f https://raw.githubusercontent.com/fluxcd/helm-operator/master/deploy/crds.yaml

# Install Helm Operator
helm upgrade -i helm-operator fluxcd/helm-operator -n fluxcd --set git.ssh.secretName=flux-ssh --set helm.versions=v3

<!-- helm upgrade -i helm-operator fluxcd/helm-operator -n fluxcd --set git.ssh.secretName=flux-git-deploy --set configureRepositories.enable=true --set configureRepositories.repositories[0].name=noah --set configureRepositories.repositories[0].url=https://dev.azure.com/lucasstellet/_git/noah  --set configureRepositories.repositories[0].username=lucas.stellet@linkapi.com.br --set configureRepositories.repositories[0].password=28E:vsnh.rdfQYk --set helm.versions=v3 -->


