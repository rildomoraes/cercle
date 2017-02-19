<template>
<textarea type="text" :placeholder="field" style="border:0px solid grey;width:100%;line-height:30px;height:30px;" >{{contact[field]}}</textarea>
</template>

<script>
export default {
  props: ['contact', 'field']
}
</script>

<style lang="sass">
  textarea:focus {
    outline-width: 0;
  }
  textarea{
    resize: none;
  }
  .my-app {
    margin-left: auto;
    margin-right: auto;
    width: 800px;

    h1 {
      text-align: center;
    }
  }
</style>