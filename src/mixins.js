import moment from 'moment';

export default {
    methods: {
        formatDate(date) {
            moment.locale('pt-br')

            if (date) {
                if (Array.isArray(date)) {
                    return date.map((value) => {
                        return moment(value).format('L');
                    });
                }
                return moment(date).format('L');
            }
            return moment().format('L');
        },
        getGifPath() {
        let gifUrl = '';
        if (process.env.NODE_ENV === 'production') {
            gifUrl =  'images/loading.gif';
        } else {
            gifUrl = './src/static/images/loading.gif'
        }
        return gifUrl;
        }
    }
}
