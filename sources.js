
const napflix = require('./napflix');
const categories = ['Sports', 'Documental', 'Music', 'Education', 'Videogames', 'Daily', 'Relax', '', 'Religion', 'Originals', 'New Content', '', 'ASMR'];

async function stream(id) {

    id = id.split(":")[1];

    for (var key in napflix) {
        if ((napflix[key]['text_code']) == id) {
            var napflix_vid = napflix[key];

            var stream = {
                ytId: napflix_vid['text_code'],
                name: 'napflix',
            };

            return stream;
        }
    }

}

async function meta(id) {

    id = id.split(":")[1];

    for (var key in napflix) {
        if ((napflix[key]['text_code']) == id) {
            if (categories[(napflix[key]['text_category'])]) {
                var cat = categories[(napflix[key]['text_category'])]
            } else {
                var cat = 'Others'
            }
            var napflix_vid = napflix[key];
            var metaObj = {
                id: 'yt_id:' + napflix_vid['text_code'],
                name: napflix_vid['text_title'],
                posterShape: 'landscape',
                type: "channel",
                poster: napflix_vid['path_img'],
                released: napflix_vid['date_init'],
                background: napflix_vid['path_img'],
                description: napflix_vid['text_discount'] + '\n' + napflix_vid['text_description'],
                year: napflix_vid['date_init'].split('/')[2],
                genre: [cat]
            };
            return metaObj;
        }
    }

}

async function catalog(genre) {
    if (genre) {
        var index = categories.indexOf(genre)
            var results = [];
        for (var key in napflix) {
            if ((napflix[key]['text_category']) == index) {
                results.push({
                    name: napflix[key]['text_title'],
                    type: "channel",
                    id: 'yt_id:' + napflix[key]['text_code'],
                    releaseInfo: napflix[key]['date_init'].split('/')[2],
                    poster: napflix[key]['path_img'],
                    posterShape: 'landscape',
                    genres: genre
                })
            }

        }

    } else {
        var results = [];
        for (var key in napflix) {
            if (categories[(napflix[key]['text_category'])]) {
                var cat = categories[(napflix[key]['text_category'])]
            } else {
                var cat = 'Others'
            }

            results.push({
                name: napflix[key]['text_title'],
                type: "channel",
                genres: cat,
                id: 'yt_id:' + napflix[key]['text_code'],
                releaseInfo: napflix[key]['date_init'].split('/')[2],
                poster: napflix[key]['path_img'],
                posterShape: 'landscape'
            })

        }

    }
    return results;
}
module.exports = {
    catalog,
    meta,
    stream
};
