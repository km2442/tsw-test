<template>
<div>

</div>
</template>

<script>
export default {
  name: "AddQuestion",
  data() {
    return {
      Question: "",
      Ans1: "",
      Ans2: "",
      Ans3: "",
      Ans4: "",
      GoodAns: [],
      Textarea: "",
      Image: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: white;
  margin: 0px 0px 20px 0px;
  text-align: center;
}
.inputs {
    margin: 10px;
}
</style>
