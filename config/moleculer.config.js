module.exports = {
  transporter: process.env.MOLECULAR_TRANSPORT ?? 'TCP',
  nodeID: 'OTT',
  registry: {
    strategy: process.env.REGISTRY_STRATEGY ?? "RoundRobin",
    preferLocal: process.env.REGISTRY_PREFER_LOCAL ?? false,
  },
  logger: console
};
