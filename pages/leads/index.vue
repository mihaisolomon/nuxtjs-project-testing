<template>
  <b-row>
    <b-col>
      <b-btn variant="outline-success" class="mb-3" :to="'/leads/new'">
        {{$t('leads.new')}}
      </b-btn>
      <b-table striped hover :items="list" :fields="fields">
        <template slot="name" slot-scope="data">
          <b-link :to="`/leads/${data.item.id}/edit`">{{data.item.name}}</b-link>
        </template>
        <template slot="members" slot-scope="data">
          {{data.item.users.length}}
        </template>
        <template slot="updated_at" slot-scope="data">
          {{data.item.updated_at | moment("from", "now")}}
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn variant="primary" :to="'leads/'+data.item.id+'/edit'">
            {{$t('edit')}}
          </b-btn>
          &nbsp;
          <b-btn variant="outline-secondary" @click="id = data.item.id" v-b-modal.confirmDestroy>
            {{$t('remove')}}
          </b-btn>
        </template>
      </b-table>
      <b-modal id="confirmDestroy" :title="$t('destroy_confirm_title')" @ok="destroy">
        {{$t('destroy_confirm')}}
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>

  import {mapState} from 'vuex';

  export default {
    name: "index",

    async fetch({store}) {
      await store.dispatch('leads/get');
    },

    data() {
      return {
        id: 0,
        fields: [
          {
            key: 'first_name',
            label: this.$t('leads.first_name'),
            sortable: true,
          },
          {
            key: 'last_name',
            label: this.$t('leads.last_name'),
            sortable: true,
          },
          {
            key: 'email',
            label: this.$t('leads.email'),
            sortable: true,
          },
          {
            key: 'updated_at',
            sortable: true,
            label: this.$t('updated_at')
          },
          {
            key: 'actions',
            label: this.$t('actions')
          }
        ]
      }
    },

    computed: {
      ...mapState({
        list: state => {
          return state.leads.list;
        }
      })
    }
  }
</script>

<style scoped>

</style>
