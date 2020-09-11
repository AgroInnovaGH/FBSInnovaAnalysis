"use strict";

import Vue from 'vue';
import axios from "axios";

let config = {
  baseURL: "https://api.fbsinnova.com/public/api/"
};



export default {
  install(Vue, options){
    Vue.prototype.$http = axios.create(config)
  }
};
