<template>
    <div class="navbar">
    <nav>
    <div class="nav-wrapper">
      <span class="brand-logo">
        <router-link :to="{name: 'Index'}">Test z TSW</router-link>
      </span>
    </div>
  </nav>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
 .navbar nav{
  padding: 0 20px;
  background-color: green;
}
</style>
