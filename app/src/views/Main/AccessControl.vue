<template>
  <v-col cols="12">
    <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3"   v-if="show_unauthorized">
      <v-card dark color="warning">
        <v-card-text class="text-h5">
          <v-icon left>mdi-alert</v-icon> You are unauthorized to view this page
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text :to="{name: 'home'}">Go back to dashboard</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-card v-if="show_access">
      <v-card-title class="primary--text mb-3 text-center justify-center">
        <v-chip color="primary" class="font-weight-bold">User Access</v-chip>
        <v-spacer/>
        <v-col cols="8" sm="7">
          <v-text-field
                  dense
                  rounded
                  filled
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
          ></v-text-field>
        </v-col>
        <v-spacer/>
      </v-card-title>
      <v-data-table
              multi-sort
              :loading="loading"
              :headers="headers"
              :items="users"
              :search="search"
              no-data-text="User unavailable"
      >
        <template v-slot:item.access="{ item }">
          <v-switch :disabled="item.super" v-model="item.access" @change="updateAccess(item)"></v-switch>
        </template>
        <template v-slot:item.super="{ item }">
          {{ item.super ? 'Yes' : 'No'}}
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
    export default {
        name: "AccessControl",
        data () {
            return {
                loading: false,
                show_access: false,
                show_unauthorized: false,
                search: '',
                headers: [
                    { text: 'Email', value: 'email', },
                    { text: 'Super Admin', value: 'super' },
                    { text: 'Allow Access', value: 'access', sortable: false},
                ],
                users: [],
            }
        },
        methods:{
            updateAccess(user){
                this.$firebase.firestore().collection('user').doc(user.id)
                    .update({ access: user.access })
            }
        },
        created() {
            if(this.$store.getters.isSuper){
                this.show_access = true
                this.loading = true
                this.$firebase.firestore().collection('user').onSnapshot(snapshot => {
                    this.users = []
                    snapshot.forEach(doc=>{
                        this.users.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    console.log(this.users)
                    this.loading = false
                })
            }else{
                this.show_unauthorized = true
            }
        }
    }
</script>

<style scoped>

</style>