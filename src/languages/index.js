import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
//import locale from 'react-native-locale-detector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import pt from './pt.json';




i18next.use(initReactI18next).init({
    lng: 'pt',
    resources:{
        en:en,
        pt:pt
    },
    react:{
        useSuspense:false
    }
})

export default i18next;