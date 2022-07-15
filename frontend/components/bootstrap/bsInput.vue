<template>
  <div class="relative-container">
    <div :class="formType">
      <label v-if="labelPos === 'top'" :for="id">{{label}}</label>
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
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <label v-if="labelPos === 'bottom'" :for="id">{{label}}</label>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'bs-input',
    emits: ['update:modelValue'],
    props: {
      modelValue: String,
      size: {
        type: String,
        default: 'default',
      },
      valid: {
        type: Boolean,
        default: false,
      },
      maxLength: Number,
      form: String,
      formType: {
        type: String,
        default: 'form-floating mt-3',
      },
      name: String,
      id: String,
      value: String,
      placeholder: String,
      type: String,
      label: String,
      labelPos: {
        type: String,
        default: 'bottom',
      },
      isRequired: Boolean,
    },
    getData() {
      return {
        showPassword: this.showPassword,
      };
    },
    methods: {
      getClasses: (size, valid) => {
        let sizeValue, isValidValue;
        sizeValue = size ? `form-control-${size}` : null;
        isValidValue = valid ? `${valid}` : 'invalid';
        return `${sizeValue} ${isValidValue}`;
      },
      hasIcon: (icon) => (icon ? 'input-group' : null),
    },
    
  };
</script>