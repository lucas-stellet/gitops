# Downluad FluxCD Helm
helm repo add fluxcd https://charts.fluxcd.io

# Create flucd namespace on cluster
kubectl create namespace fluxcd

# Install FluxCD Chart on Cluster 
helm upgrade -i flux fluxcd/flux --wait --namespace fluxcd --set git.url=git@github.com:lucas-stellet/noah-api --set git.pollInterval=1m --set registry.automationInterval=1m --set image.pullSecret=regcred

# Grant FLuxCD access to git repository
fluxctl identity --k8s-fwd-ns fluxcd

# Install HelmRelease Custom Resource Definition 
kubectl apply -f https://raw.githubusercontent.com/fluxcd/helm-operator/master/deploy/crds.yaml

# Set credentials to DockerHub Private Registry
kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/  --docker-username=lustepe --docker-password=flaxfla1993 -n noah-api

kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "regcred"}]}' -n noah-api

# Install Helm Operator
helm upgrade -i helm-operator fluxcd/helm-operator --wait \
--namespace fluxcd \
--set git.ssh.secretName=flux-git-deploy \
--set helm.versions=v3



