import { getMusicUrl } from '~/transformers/url';

export const lyricParser = (lyric) => {
    const lines = lyric.split('\n');
    const pattern = /\[\d{2}:\d{2}(.\d{2,})?\]/g;
    const lyricList = []
    lines.forEach(item => {
        let mResult = item.match(pattern);
        //提取歌词
        let value = item.replace(pattern, '');
        if (!value) return;
        let time = 0;
        if (mResult && mResult.length) {
            let t = mResult[0].slice(1, -1).split(':')
            time = parseInt(t[0], 10) * 60 + parseFloat(t[1])
        }
        lyricList.push({ time, value })
    })
    return lyricList
}


export const timePraser = (t) => {
    t = Math.floor(t / 1000);
    let m = Math.floor(t / 60);
    let s = t % 60;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}

export const arsParser = (list) => {
    return list.map(item => item.name).join('/');
}

export const posterParser = (al) => {
    return al ? al.picUrl : '';
}

export const songParser = (song) => {
    song.src = getMusicUrl(song.id);
    song.duration = timePraser(song.dt);
    song.singer = arsParser(song.ar)
    song.poster = posterParser(song.al)
    return song;
}