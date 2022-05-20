<template>
    <button class="btn-clipboard btn-sm btn-primary" @click="copy">
        <i class="bi bi-clipboard"></i> {{ $t('interface.copy') }}
    </button>
</template>
<script>
  export default {
    name: 'bsCopy',
    props: {
      selector: ''
    },
    methods: {
      copy() {
        navigator.clipboard.writeText(
          document.querySelector(this.$props.selector).value
        );
      },
    }
  }
</script>