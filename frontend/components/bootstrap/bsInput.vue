<template>
  <div class="relative-container">
    <div :class="formType">
      <label v-if="labelPos === 'top'" :for="id">{{ label }}</label>
      <input
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :id="id"
        :form="form"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :isRequired="isRequired"
        v-bind="$attrs"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <label v-if="labelPos === 'bottom'" :for="id">{{ label }}</label>
    </div>
  </div>
</template>



<script setup>
const props = defineProps({
  modelValue: String,
  size: {
    type: String,
    default: 'default'
  },
  valid: {
    type: Boolean,
    default: false
  },
  maxLength: Number,
  form: String,
  formType: {
    type: String,
    default: 'form-floating mt-3'
  },
  name: String,
  id: String,
  value: String,
  placeholder: String,
  type: String,
  label: String,
  labelPos: {
    type: String,
    default: 'bottom'
  },
  showPassword: Boolean,
  isRequired: Boolean
});
const emit = defineEmits(['update:modelValue'])
const getClasses = (size, valid) => {
  let sizeValue, isValidValue;
  sizeValue = size ? `form-control-${size}` : null;
  isValidValue = valid ? `${valid}` : 'invalid';
  return `${sizeValue} ${isValidValue}`;
};

const hasIcon = (icon) => (icon ? 'input-group' : null);
</script>