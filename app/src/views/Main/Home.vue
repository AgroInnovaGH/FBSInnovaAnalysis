<template>
  <v-col cols="12">
    <v-progress-linear indeterminate color="primary" v-if="loading"></v-progress-linear>
    <v-row justify="start">
      <v-col v-for="(card, i) in cards" :key="i" cols="12" sm="6" md="4">
        <v-card :to="card.to" :disabled="card.disabled">
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-avatar size="72" color="white">
                  <v-img height="72" contain :src="card.img"/>
                </v-avatar>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="text-h6">{{card.name}}</div>
                <div v-if="card.disabled" class="text-h4 primary--text">
                  <v-icon>mdi-lock</v-icon>
                </div>
                <div v-else class="text-h4 primary--text">{{card.count}}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
      return {
          farmersSum: 0,
          loading: false,
          cards: [
              {
                  to: {name: 'farmers'},
                  img: require('../../assets/svg/006-farmer.svg'),
                  count: 0,
                  name: 'Farmers',
              },
              {
                  to: {name: 'farms'},
                  img: require('../../assets/svg/005-farm.svg'),
                  count: 0,
                  name: 'Farms',
                  disabled: true
              },
              {
                  to: {name: 'money-in'},
                  img: require('../../assets/svg/042-planting.svg'),
                  count: 0,
                  name: 'Money In',
                  disabled: true
              },
              {
                  to: {name: 'money-out'},
                  img: require('../../assets/svg/043-hay.svg'),
                  count: 0,
                  name: 'Money Out',
                  disabled: true
              },
          ]
      }
  },
    created() {
      this.loading = true
      this.$http.get('/farmers')
        .then(res=>{
            this.cards[0].count = res.data.length
        }).catch(err=>{
            console.error({err})
      }).finally(()=>{
          this.loading = false
      })
    }
}
</script>
