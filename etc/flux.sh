echo "creating cluster\n"
kind create cluster --image kindest/node:v1.20.0 --config ~/Documents/k8s/kind.yaml --name tsubasa

echo "\ncreating fluxcd namespace on cluster"
kubectl create namespace fluxcd 

echo "\ninstalling fluxcd helm chart"
helm upgrade -i flux fluxcd/flux --wait --namespace fluxcd --set git.url=git@github.com:lucas-stellet/noah-api --set git.pollInterval=1m --set registry.automationInterval=1m --set image.pullSecret=regcred 

echo "\ninstalling fluxcd helm chart"
fluxctl identity --k8s-fwd-ns fluxcd 
sleep 15

echo "\napplying helm operator crd"
kubectl apply -f https://raw.githubusercontent.com/fluxcd/helm-operator/master/deploy/crds.yaml

echo "\ninstall helmoperator fluxcd helm chart"
helm upgrade -i helm-operator fluxcd/helm-operator --wait \
--namespace fluxcd \
--set git.ssh.secretName=flux-git-deploy \
--set helm.versions=v3