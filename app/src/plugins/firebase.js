import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/analytics'

export default {
    install(Vue, options){
        app.initializeApp({
            apiKey: "AIzaSyAI601ETtndErG7zX8kRYKrGDRUQ72Df0g",
            authDomain: "fbsinovva.firebaseapp.com",
            databaseURL: "https://fbsinovva.firebaseio.com",
            projectId: "fbsinovva",
            storageBucket: "fbsinovva.appspot.com",
            messagingSenderId: "759507210591",
            appId: "1:759507210591:web:5628cae4c47499521ce6ea",
            measurementId: "G-K9G7671THE"
        })

        app.analytics().setAnalyticsCollectionEnabled(true)

        Vue.prototype.$firebase = app
    }
}