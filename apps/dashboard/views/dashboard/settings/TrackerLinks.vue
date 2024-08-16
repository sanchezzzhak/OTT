<template>
  <div class="row">
    <div class="col-md-6">
      <div class="clipboard-container">
        <bs-input
            id="click-url"
            :label="$t('attributes.clickUrl')"
            v-model="clickUrl"
            data-name="clickUrl"
        />
        <bs-copy selector="#click-url"/>

      </div>
    </div>
    <div class="col-md-6">
      With OTT you don't need to place any PHP code on your landing pages.
      Visitors are redirected based on data stored in a cookie and referrer.
    </div>
  </div>

</template>

<script>
  import {$axios} from "../../../api";

  export default  {
    data() {
      return {
        clickUrl: ''
      };
    },
    mounted() {
      $axios.get('setting/info-tracker-url').then((data) => {
        this.clickUrl = data.clickUrl;
      })
    },
    methods: {
      saveOptions(event) {
        let attribute = event.target.dataset.name;
        let value = this[attribute] || '';
        let data = {};
        data[attribute] = value;

        $axios.post('setting/update', data).then((response) => {
          console.log(response)
        })
      },
    }
  }
</script>