<template>
  <div :class="formType">
      <label v-if="labelPos === 'top'" :for="id">{{label}}</label>
      <input
          :type="type"
          class="form-control"
          :class="getClasses(size, valid)"
          :name="name"
          :id="id"
          :value="value"
          :form="form"
          :placeholder="placeholder"
          :isRequired="isRequired"
      />
      <label v-if="labelPos === 'bottom'" :for="id">{{label}}</label>
    </div>
</template>

<script>
export default {
  name: "bs-input",
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    form:String,
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
    isRequired: Boolean,
  },
  methods: {
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;
      sizeValue = size ? `form-control-${size}` : null;
      isValidValue = valid ? `${valid}` : "invalid";
      return `${sizeValue} ${isValidValue}`;
    },
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
};
</script>