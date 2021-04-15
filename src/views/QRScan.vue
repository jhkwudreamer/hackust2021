<template>
  <v-card color="rgb(255, 255, 255, 0.8)">
    <v-card-title>
      <h2>Scan the QR code</h2>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <video v-show="isScannerActive" id="webcamDisplay"></video>
            <v-btn v-if="!isScannerActive" @click="startScan"
              >Scan another</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import QrScanner from "qr-scanner";
import QrScannerWorkerPath from "!!file-loader!@/../node_modules/qr-scanner/qr-scanner-worker.min.js";
export default {
  data() {
    return {
      qrScanner: null,
      isScannerActive: false,
    };
  },

  methods: {
    startScan() {
      this.qrScanner.start();
      this.isScannerActive = true;
    },
    stopScan() {
      this.qrScanner.stop();
      this.isScannerActive = false;
    },
  },

  mounted() {
    // Note: To use webcam, the page must be served via HTTPS
    QrScanner.WORKER_PATH = QrScannerWorkerPath;
    this.qrScanner = new QrScanner(
      document.getElementById("webcamDisplay"),
      (result) => {
        this.stopScan();
        window.alert("decoded qr code:\n" + result);
      }
    );
    this.startScan();
  },

  beforeDestroy() {
    this.stopScan();
    this.qrScanner.destroy();
    this.qrScanner = null;
  },
};
</script>

<style scoped>
#webcamDisplay {
  max-width: 100%;
}
</style>
