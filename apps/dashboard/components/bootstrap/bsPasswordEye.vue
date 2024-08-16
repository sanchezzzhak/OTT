<template>
  <div :class="formType">
    <label v-if="labelPos === 'top'" :for="id">{{label}}</label>
    <input
      :type="inputType"
      class="form-control"
      :class="getClasses(size, valid)"
      :name="name"
      :id="id"
      :form="form"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :isRequired="isRequired"

      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <label v-if="labelPos === 'bottom'" :for="id">{{label}}</label>
    
    <i
      @click.prevent="togglePasswordShow()"
      class="absolute-control fas " :class="showPasswordIcon">
    </i>
    
    <div v-if="showStrengthMeter" :class="[strengthMeterClass]">
      <div :class="[strengthMeterFillClass]" :data-score="passwordStrength"></div>
    </div>
    
  </div>
  <!--
        v-model="value"
-->
</template>

<script>
  
  export default {
    name: 'bs-password-eye',
    emits: ['update:modelValue'],
    inheritAttrs: false,
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
      showPassword: {
        type: Boolean,
        default: false
      },
      showStrengthMeter: {
        type: Boolean,
        default: false
      },
      strengthMeterClass: {
        type: String,
        default: 'bs-password-eye__strength-meter'
      },
      strengthMeterFillClass: {
        type: String,
        default: 'bs-password-eye__strength-meter--fill'
      },
    },
    data() {
      return {
        _showPassword: false,
      };
    },
    computed: {
      passwordStrength () {
        return 50;
      },
      inputType () {
        return this.$data._showPassword || this.$data._showPassword ? 'text' : 'password'
      },
      showPasswordIcon() {
        return this.$data._showPassword ? 'fa-eye-slash': 'fa-eye';
      },
    },
    methods: {
      togglePasswordShow() {
        this.$data._showPassword = !this.$data._showPassword;
        this.$forceUpdate();
      },
      getClasses: (size, valid) => {
        let sizeValue, isValidValue;
        sizeValue = size ? `form-control-${size}` : null;
        isValidValue = valid ? `${valid}` : 'invalid';
        return `${sizeValue} ${isValidValue}`;
      },
    },
    
  };
</script>

<style scoped>
  .absolute-control {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ced4da;
  }
</style>