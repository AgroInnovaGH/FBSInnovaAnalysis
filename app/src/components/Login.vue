<template>
  <v-card>
    <v-card-title class="justify-center">
      <img width="72px" src="../assets/logo.png"></img>
      <span class="text-h4" >
                  <span class="primary--text">FBSInnova</span>
                  <span class="secondary--text">Analysis</span>
                </span>
    </v-card-title>
    <v-card-subtitle class="text-center">
                <span class="text-h5">
                  Login
                </span>
    </v-card-subtitle>
    <v-card-text class="my-7">
      <v-form>
        <v-text-field
                v-model="email"
                dense
                label="Email"
                filled
                type="email"
                prepend-inner-icon="mdi-email"
                rounded
        >
        </v-text-field>
        <v-text-field
                v-model="password"
                dense
                label="Password"
                filled
                type="password"
                prepend-inner-icon="mdi-lock"
                rounded
        >
          <v-icon slot="append">mdi-eye</v-icon>
        </v-text-field>
        <v-col cols="12">
          <v-row>
            <v-btn @click="loginGoogle" color="blue" :loading="loading.google" dark rounded large>
              <v-icon left>mdi-google</v-icon> Google
            </v-btn>
            <v-spacer/>
            <v-btn :loading="loading.email" @click="loginUser" color="primary" rounded large>
              <v-icon left>mdi-login</v-icon> Sign In
            </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center align-center">
        <span>
          Don't have an account?
          <v-btn @click="$emit('auth-change', 'sign-up')" text small color="primary">Sign Up</v-btn>
        </span>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                email: '',
                password: '',
                loading: {
                    email: false,
                    google: false
                }
            }
        },
        methods: {
            loginUser(){
                this.loading.email = true
                this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                  .then(_=>{
                      this.$router.push({name: 'home'})
                  }).catch(err=>{
                    this.$emit('error', err.message)
                  }).finally(()=>{
                        this.loading.email = false
                  })
            },
            loginGoogle(){
                this.loading.google = true
                let provider = new this.$firebase.auth.GoogleAuthProvider
                this.$firebase.auth().signInWithPopup(provider)
                  .then(()=>{
                      this.$router.push({name: 'home'})
                  }).catch(err=>{
                      this.$emit('error', err.message)
                  }).finally(()=>{
                      this.loading.google = false
                })
            }
        }
    }
</script>

<style scoped>

</style>