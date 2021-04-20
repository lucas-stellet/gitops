const k8s = require('./kubernetes.service');
const util = require('util');

(async () => {
  let deployments = await k8s.listDeployments('linkapi');
  deployments = deployments.map(deploy => JSON.stringify(deploy));
  console.log(deployments);
})();
