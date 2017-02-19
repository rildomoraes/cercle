<template>
<input type="text" :placeholder="field" style="border:0px solid grey;width:100%;line-height:30px;height:30px;" :value="contact[field]">
</template>

<script>
export default {
  props: ['contact', 'field']
}
</script>

<style lang="sass">
  input:focus {
    outline-width: 0;
  }
  textarea{
    resize: none;
  }
</style>