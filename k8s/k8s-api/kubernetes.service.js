const k8s = require('@kubernetes/client-node');

class KubernetesClient {
  constructor() {}

  startClient(apiVersion) {
    const kc = new k8s.KubeConfig();

    kc.loadFromDefault();

    return kc.makeApiClient(apiVersion);
  }

  listSecrets(namespace) {
    const api = this.startClient(k8s.CoreV1Api);
    return new Promise((resolve, reject) => {
      if (namespace) {
        api
          .listNamespacedSecret(namespace)
          .then(res => {
            return resolve(res.body.items);
          })
          .catch(err => {
            return reject(err);
          });
      }
      api
        .listSecretForAllNamespaces()
        .then(res => {
          resolve(res.body.items);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  listIngresses(namespace) {
    const api = this.startClient(k8s.ExtensionsV1beta1Api);
    return new Promise((resolve, reject) => {
      if (namespace) {
        api
          .listNamespacedIngress(namespace)
          .then(res => {
            resolve(res.body.items);
          })
          .catch(err => {
            reject(err);
          });
      }
      api
        .listIngressForAllNamespaces()
        .then(res => {
          resolve(res.body.items);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  listPods(namespace) {
    const api = this.startClient(k8s.CoreV1Api);
    return new Promise((resolve, reject) => {
      if (namespace) {
        api
          .listNamespacedPod(namespace)
          .then(res => {
            resolve(res.body.items);
          })
          .catch(err => {
            reject(err);
          });
      }
      api
        .listPodForAllNamespaces()
        .then(res => {
          resolve(res.body.items);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  listDeployments(namespace) {
    const api = this.startClient(k8s.AppsV1Api);
    return new Promise((resolve, reject) => {
      if (namespace) {
        api
          .listNamespacedDeployment(namespace)
          .then(res => {
            resolve(res.body.items);
          })
          .catch(err => {
            reject(err);
          });
      }
      api
        .listDeploymentForAllNamespaces()
        .then(res => {
          resolve(res.body.items);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = new KubernetesClient();
