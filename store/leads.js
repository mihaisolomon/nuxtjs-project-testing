import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  lead: {},
});

export const mutations = {
  set(state, lead) {
    state.list = lead;
  },
  add(state, value) {
    merge(state.list, value);
  },
  remove(state, {lead}) {
    state.list.filter(c => lead.id !== c.id);
  },
  mergeLeads(state, form) {
    assign(state.lead, form);
  },
  setLeads(state, form) {
    state.lead = form;
  }
};

export const actions = {
  async get({commit}) {
    await this.$axios.get(`leads`).then((response) => {
      if(response.status === 200) {
        commit('set', response.data);
      }
    });
  },

  async show({commit}, params) {
    await this.$axios.get(`leads/${params.leads_id}`).then((response) => {
      if(response.status === 200) {
        commit('mergeLeads', response.data);
      }
    })
  },

  async set({commit}, leads) {
    await commit('set', leads);
  },

  async form({commit}, form) {
    await commit('mergeLeads', form);
  },

  async add({commit}, lead) {
    await commit('add', lead);
  },

  create({commit}, params) {
    return this.$axios.post(`leads`, {'lead': params});
  },

  update({commit}, params) {
    return this.$axios.post(`leads/${params.leads_id}`, {'lead': params});
  },

  delete({commit}, params) {
    return this.$axios.post(`leads/${params.leads_id}`);
  }
};
