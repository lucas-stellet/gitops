const k8s = require('./kubernetes.service');
const util = require('util');

(async () => {
  const deployments = await k8s.listDeployments('linkapi');
  const jsonDeploy = JSON.stringify(
    deployments.map(deployment => ({
      name: deployment.metadata.name,
      namespace: deployment.metadata.namespace,
      spec: {
        replicas: deployment.spec.replicas,
        containers: deployment.spec.template.spec.containers.map(container => ({
          name: container.name,
          envFrom: container.envFrom,
          image: container.image,
          ports: container.ports,
          resources: container.resources,
        })),
      },
      status: {
        conditions: deployment.status.conditions,
      },
    }))
  );
  console.log(jsonDeploy);
})();
