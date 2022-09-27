<!--

** Created by Vugar Safarzada (27.09.2022) **

TODO: Yeni tapşırıqların yaradılması üçün bölmə
TODO: Mövcud tapşırıqların siyahısı
====================================
TODO: Yeni tapşırığın yaradılması,
TODO: Tapşırığı tamamlanmış və tamamlanmamış olaraq işarələmək,
TODO: Öncədən qeydə alınmış tapşırığı silmək,
TODO: Tapşırığın başlığını və teqlərin siyahısını redaktə etmək
====================================
TODO: Yeni teqlərin öncədən qeydə alınmış teqlər əsasında təyin olunması.
TODO: Teq ilə taskların filter olunaraq təsvir olunması
TODO: Teq filteri sıfırlamaq

-->

<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'

export default {
  components: { Layout },
  data() {
    return {}
  },
}

</script>

<style lang="scss">
@import './styles/global.css';
</style>