<template>
  <div>
    <div class="main-header">
      <Header />
    </div>
    <div class="main-container">
      <nuxt />
    </div>
    <div class="main-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

export default {
  components: {Header, Footer}
}
</script>