<template>
    <button class="btn-clipboard btn-sm btn-primary" @click="copy">
        <i class="bi bi-clipboard"></i> {{ $t('interface.copy') }}
    </button>
</template>
<script setup>
  const props = defineProps({
    selector: String
  })

  function copy() {
    navigator.clipboard.writeText(
      document.querySelector(props.selector).value
    );
  }

</script>