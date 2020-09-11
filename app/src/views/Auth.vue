<template>
  <v-app>
    <v-main class="main">
      <v-col class="blur fill-height"></v-col>
      <v-col class="fill-height" cols="12">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-fade-transition  mode="out-in" leave-absolute group>
              <login @error="showError" @auth-change="changeAuthType" v-if="auth_type === 'login'" key="login"/>
              <sign-up @error="showError" @auth-change="changeAuthType" v-if="auth_type === 'sign-up'" key="sign-up"/>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-snackbar top v-model="error.show" color="deep-orange">
        <v-icon left>mdi-alert</v-icon> {{error.message}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
    import Login from "../components/Login";
    import SignUp from "../components/SignUp";
    export default {
        name: "Auth",
        components: {SignUp, Login},
        data(){
            return {
                auth_type: 'login',
                error: {
                    message: '',
                    show: false
                }
            }
        },
        methods: {
            changeAuthType(type){
                this.auth_type = type
            },
            showError(message){
                console.log(message)
                this.error.message = message
                this.error.show = true
            }
        }
    }
</script>

<style scoped>
  .main{
    background: url('https://fbsinnova.com/img/vue-mk-header.eae115b4.jpg') center;
    background-size: cover;
  }

  .blur{
    position:fixed;
    /*background: #ffffff33;*/
    backdrop-filter: blur(5px);
  }
</style>