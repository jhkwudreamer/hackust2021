<template>
  <div class="container">
    <div id="pano"></div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    const fenway = { lat: 22.3095008, lng: 114.2377189 };
    // const panorama =
    // eslint-disable-next-line no-undef
    new google.maps.StreetViewPanorama(document.getElementById("pano"), {
      position: fenway,
      pov: {
        heading: 180,
        pitch: 10,
      },
      zoomControl: false,
      imageDateControl: false,
      linksControl: true, // ?
      fullscreenControl: false,
      addressControl: false,
    });
  },
};
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}

#pano {
  display: flex;
  width: 100%;
}
</style>
