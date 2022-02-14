<template>
  <div class="form-check form-switch">
    <input class="form-check-input"
       :class="inputClass"
       type="checkbox"
       :name="name"
       :id="id"
       :checked="checked"
       v-model="value"
       @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="form-check-label" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "bs-switch",
  emits: ['update:modelValue'],
  props: {
    name: String,
    id: String,
    checked: String,
    value: Boolean,
    labelClass: String,
    inputClass: String,
  },
};
</script>