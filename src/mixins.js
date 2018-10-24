export default {
    methods: {
        formatDate(date) {
            if (date) {
                if (Array.isArray(date)) {
                return date.map((value) => {
                    return new Date(value).toJSON().slice(0,10).split('-').reverse().join('/');
                });
                }
                return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
            }
            return new Date().toJSON().slice(0,10).split('-').reverse().join('/');
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
