const { Service } = require('moleculer');
const kleur = require("kleur");

function humanize(milli) {
  const units = ["h", "m", "s", "ms", "μs", "ns"];
  const divisors = [60 * 60 * 1000, 60 * 1000, 1000, 1, 1e-3, 1e-6];
  if (milli == null) return "?";
  for (let i = 0; i < divisors.length; i++) {
    const val = milli / divisors[i];
    if (val >= 1.0) return "" + Math.floor(val) + units[i];
  }

  return "now";
}

const padS = (val, len) => val.padStart(len)
const padE =  (val, len) => val.padEnd(len)

class MetricService extends Service {

  nodes = [];
  metrics = {};

  #sampleInterval;
  #loopUtilization;
  #lastSampleTime;
  #lastSampleCpuUsage;

  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'metric',
      created: this.createdService,
      methods: {},
      events: {
        "$metrics.snapshot"(ctx) {
          console.log(ctx);
          // ctx.params.map(metric => this.addMetric(metric, ctx.nodeID));
        },
      }
    });

    this.#sampleInterval = 10;
    this.#loopUtilization = true;


  }

  createdService() {
    this.refresh();
    this.metricTimer = setInterval(() => this.printMetrics(), 5000);
  }

  addMetric(metric, nodeID) {
    if (!this.metrics[metric.name]) this.metrics[metric.name] = {};

    const item = this.metrics[metric.name];
    item[nodeID] = metric.values;
  }

  getMetricValueByNode(nodeID, metricName, valueName, agg) {
    const item = this.metrics[metricName];
    if (item) {
      const values = item[nodeID];
      if (values) {
        return this.aggregateValues(values, valueName, agg);
      }
    }
  }

  columnize(arr, count) {
    const res = [];

    let tmp = [];
    arr.forEach((item, i) => {
      if ((i + 1) % count === 0) {
        tmp.push(item);
        res.push(tmp);
        tmp = [];
      } else {
        tmp.push(item + " |");
      }
    });

    if (tmp.length > 0) res.push(tmp);

    return res;
  }

  printMetrics() {
    console.log(
      kleur.yellow().bold("\nMetrics:  "),
      kleur.grey("Time:"),
      kleur.grey(humanize(process.uptime() * 1000))
    );
    console.log(kleur.yellow().bold("========"));

    const rows = [];
    let totalTx = 0,
      totalTxRate = 0,
      totalTxBytes = 0,
      totalTxBytesRate = 0;
    let totalRx = 0,
      totalRxRate = 0,
      totalRxBytes = 0,
      totalRxBytesRate = 0;



    this.nodes.forEach(node => {
      const txPackets = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.sent.total",
        "value"
      );
      if (txPackets) totalTx += txPackets;
      const txPacketsRate = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.sent.total",
        "rate"
      );
      if (txPacketsRate) totalTxRate += txPacketsRate;
      const txBytes = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.sent.bytes",
        "value"
      );
      if (txBytes) totalTxBytes += txBytes;
      const txBytesRate = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.sent.bytes",
        "rate"
      );
      if (txBytesRate) totalTxBytesRate += txBytesRate;

      const rxPackets = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.received.total",
        "value"
      );
      if (rxPackets) totalRx += rxPackets;
      const rxPacketsRate = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.received.total",
        "rate"
      );
      if (rxPacketsRate) totalRxRate += rxPacketsRate;
      const rxBytes = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.received.bytes",
        "value"
      );
      if (rxBytes) totalRxBytes += rxBytes;
      const rxBytesRate = this.getMetricValueByNode(
        node.nodeID,
        "moleculer.transporter.packets.received.bytes",
        "rate"
      );
      if (rxBytesRate) totalRxBytesRate += rxBytesRate;

      if (txPackets) {
        rows.push(
          [
            padE(node.nodeID, 8),
            kleur.grey("TX:"),
            kleur.green().bold(padS(val(txPackets) + " pck", 8)),
            kleur.green().bold(padS(val(txPacketsRate / 60) + " p/s", 8)),
            kleur.green().bold(padS(this.humanReadableBytes(txBytes), 8)),
            kleur.grey("/"),
            kleur.green().bold(padS(this.humanReadableBps(txBytesRate), 8)),
            kleur.grey("   RX:"),
            kleur.green().bold(padS(val(rxPackets) + " pck", 8)),
            kleur.green().bold(padS(val(rxPacketsRate / 60) + " p/s", 8)),
            kleur.green().bold(padS(this.humanReadableBytes(rxBytes), 8)),
            kleur.grey("/"),
            kleur.green().bold(padS(this.humanReadableBps(rxBytesRate), 8))
          ].join(" ")
        );
      }
    });
    this.columnize(rows, 2).forEach(row => console.log(" ", ...row));

    // Total
    if (totalTx || totalRx) {
      console.log(padE("  ", 80, "-"));
      console.log(
        [
          " ",
          padE("Total", 8),
          kleur.grey("TX:"),
          kleur.green().bold(padS(val(totalTx) + " pck", 8)),
          kleur.green().bold(padS(val(totalTxRate / 60) + " p/s", 8)),
          kleur.green().bold(padS(this.humanReadableBytes(totalTxBytes), 8)),
          kleur.grey("/"),
          kleur.green().bold(padS(this.humanReadableBps(totalTxBytesRate), 8)),
          kleur.grey("   RX:"),
          kleur.green().bold(padS(val(totalRx) + " pck", 8)),
          kleur.green().bold(padS(val(totalRxRate / 60) + " p/s", 8)),
          kleur.green().bold(padS(this.humanReadableBytes(totalRxBytes), 8)),
          kleur.grey("/"),
          kleur.green().bold(padS(this.humanReadableBps(totalRxBytesRate), 8))
        ].join(" ")
      );
    }
  }


  aggregateValues(values, valueName = "value", agg = "sum") {
    if (agg === "sum") {
      return values.reduce((a, b) => a + b[valueName], 0);
    }
    if (agg === "avg") {
      return values.reduce((a, b) => a + b[valueName], 0) / values.length;
    }
  }

  humanReadableBps(bpm) {
    if (bpm == null || Number.isNaN(bpm)) return "-";
    const bps = (bpm * 8) / 60;
    if (bps >= 1000 * 1000) return `${(bps / 1000 / 1000).toFixed(0)} Mbps`;
    if (bps >= 1000) return `${(bps / 1000).toFixed(0)} kbps`;
    else return `${bps.toFixed(0)} bps`;
  }

  humanReadableBytes(bytes) {
    if (bytes == null || Number.isNaN(bytes)) return "-";
    if (bytes >= 1000 * 1000) return `${(bytes / 1000 / 1000).toFixed(0)} MB`;
    if (bytes >= 1000) return `${(bytes / 1000).toFixed(0)} kB`;
    else return `${bytes.toFixed(0)} B`;
  }













  #sampleDelay (elapsedTime) {
    return Math.max(0, elapsedTime - this.#sampleInterval)
  }

  #sampleCpuUsage (elapsedTime) {
    const elapsedCpuUsage = process.cpuUsage(this.#lastSampleCpuUsage)
    const elapsedCpuUsageTotal = (
      elapsedCpuUsage.user + elapsedCpuUsage.system
    ) / 1000
    return elapsedCpuUsageTotal / elapsedTime
  }

  refresh() {
    this.#lastSampleTime = process.hrtime()
    this.#lastSampleCpuUsage = process.cpuUsage()
  }

  systemInfo = () => {
    return {
      clock: {
        hrtime: process.hrtime(),
        unixtime: Date.now()
      },
      nodeVersions: process.versions,
    }
  }

  sample () {
    const elapsedTime = this.hrtime2ms(process.hrtime(this.#lastSampleTime))
    return {
      timestamp: Date.now(),
      delay: this.#sampleDelay(elapsedTime),
      cpu: this.#sampleCpuUsage(elapsedTime),
      memory: process.memoryUsage(),
      handles: process._getActiveHandles().length,
      loopUtilization: this.#loopUtilization ? eventLoopUtilization().utilization * 100 : NaN
    }
  }

  hrtime2ms (time) {
    return time[0] * 1e3 + time[1] * 1e-6
  }



}

module.exports = MetricService;