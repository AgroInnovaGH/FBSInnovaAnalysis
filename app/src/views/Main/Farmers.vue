<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="primary--text mb-3 text-center justify-center">
        <v-chip color="primary" class="font-weight-bold">Farmers</v-chip>
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
        <v-col>
          <v-btn icon disabled>
            <v-icon>mdi-file-pdf-outline</v-icon>
          </v-btn>
          <v-btn icon disabled>
            <v-icon>mdi-file-excel-outline</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-data-table
          :loading="loading"
          :headers="headers"
          :items="farmers"
          :search="search"
          sort-by="created_at"
          sort-desc
          no-data-text="farmer records unavailable"
      >
        <template v-slot:item.created_at="{item}">
          {{item.created_at | moment('Do MMMM, YYYY')}}
        </template>
        <template v-slot:item.farm="{ item }">
          <v-btn disabled outlined color="primary" rounded>
            <v-icon left>mdi-barn</v-icon>
            View
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
    export default {
        name: "Farmers",
        data () {
            return {
                loading: false,
                search: '',
                headers: [
                    { text: 'Name', value: 'name', },
                    { text: 'Gender', value: 'gender' },
                    { text: 'Phone Number', value: 'phoneNumber' },
                    { text: 'Country', value: 'country' },
                    { text: 'Date Created', value: 'created_at' },
                    { text: 'Farm', value: 'farm', align: 'center' }
                ],
                farmers: [],
            }
        },
        created() {
            this.loading = true
            this.$http.get('farmers')
              .then(res=>{
                  this.$firebase.analytics().logEvent('page_view', 'farmers')
                  this.farmers = res.data
              }).catch(err=>{
                  console.error(err)
              }).finally(()=>{
                  this.loading = false
            })


        }
    }
</script>

<style scoped>

</style>