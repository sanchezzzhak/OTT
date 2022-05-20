<template>
    <div class="page-settings container-fluid">
        <h4>{{ $t('Settings') }}</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="clipboard-container">
                    <bs-input
                        id="click-url"
                        :label="$t('attributes.clickUrl')"
                        v-model="clickUrl"
                    />
                    <bs-copy selector="#click-url"/>

                </div>
            </div>
            <div class="col-md-6">
                With OTT you don't need to place any PHP code on your landing pages.
                Visitors are redirected based on data stored in a cookie and referrer.
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        clickUrl: '',
      };
    },
  };
</script>