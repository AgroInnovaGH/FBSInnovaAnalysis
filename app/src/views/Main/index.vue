<template>
  <v-app>
    <v-app-bar
      clipped-left
      app
      :color="$vuetify.theme.dark ? '' : 'white'"
    >
      <div class="d-flex align-center">
          <v-img
            alt="FBInnova Analysis"
            class="shrink mr-2"
            contain
            src="../../assets/logo.png"
            transition="scale-transition"
            width="40"
          />
      </div>
      <span class="hidden-sm-and-down text-h5 primary--text">
        FBS<span class="secondary--text">Innova</span>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-if="!$vuetify.theme.dark">mdi-weather-night</v-icon>
        <v-icon v-else>mdi-weather-sunny</v-icon>
      </v-btn>
      <v-btn @click="show_drawer = true" class="hidden-lg-and-up" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="show_drawer"
    >
      <v-list class="mt-n2">
        <v-list-item exact color="primary" :to="{name: 'home'}">
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/044-farm.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Dashboard
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="$store.getters.isSuper" color="primary" :to="{name: 'access-control'}">
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/068-phone.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Access Control
          </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'farmers'}" color="primary">
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/006-farmer.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Farmers
          </v-list-item-title>
        </v-list-item>
        <v-list-item  disabled>
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/005-farm.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Farms
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled>
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/042-planting.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Money In
          </v-list-item-title>
        </v-list-item>
        <v-list-item  disabled>
          <v-list-item-avatar>
            <v-avatar class="pa-2">
              <v-img contain src="../../assets/svg/043-hay.svg"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            Money Out
          </v-list-item-title>
        </v-list-item>
        <v-divider/>
        <v-list-item disabled>
          <v-list-item-icon>
            <v-icon right>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Settings
          </v-list-item-title>
        </v-list-item>
        <v-list-item color="secondary" @click="$firebase.auth().signOut()">
          <v-list-item-icon>
            <v-icon right>mdi-power-off</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <template v-if="show_app">
        <v-col v-if="!hasAccess" class="text-center" cols="12" sm="8" offset-sm="2" md="6" offset-md="3" xl="4" offset-xl="4">
          <v-card>
            <v-card-title class="warning white--text justify-center">
              <v-icon color="white" left>mdi-account-lock</v-icon>Account access Denied
            </v-card-title>
            <v-card-subtitle class=" pt-3">
              <p>This account has not been allowed access</p>
              <p>
                You can contact
                <a href="https://www.agroinnovagh.com/contact" target="_blank">AgroInnova</a>
                for further assistance
              </p>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-fade-transition v-else leave-absolute mode="out-in">
          <keep-alive >
              <router-view :class="!$vuetify.theme.dark ? 'grey lighten-5 fill-height': ''" />
          </keep-alive>
        </v-fade-transition>
      </template>
    </v-main>
  </v-app>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                show_app: false,
                show_drawer: this.$vuetify.breakpoint.smAndDown ? false : true
            }
        },
        computed: {
            ...mapGetters({
                hasAccess: 'hasAccess'
            })
        },
        created() {
            this.$firebase.auth().onAuthStateChanged(user=>{
                if(user){
                    this.$firebase.analytics().setUserId(user.uid)
                    this.$firebase.analytics().setUserProperties({
                        ...user
                    })
                    this.$firebase.firestore().collection('user').doc(user.uid)
                      .onSnapshot(snapshot => {
                          let data = snapshot.data()
                          if(data){
                              this.$store.commit('setUser', {
                                  auth: user,
                                  details: data
                              })
                              this.show_app = true
                          }else{
                              data = {
                                  email: user.email,
                                  access: false
                              }
                              this.$firebase.firestore().collection('user').doc(user.uid).set(data)
                                .then(_=>{
                                    this.$store.commit('setUser', {
                                        auth: user,
                                        details: data
                                    })
                                    this.show_app = true
                                })
                          }
                      }, error => {
                          console.error({error})
                      })
                }else{
                    this.$router.push({name: 'auth'})
                }
            })
        }
    }
</script>

<style scoped>

</style>