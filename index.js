require('dotenv').config();

const Slack = require("slack");
const slack = new Slack({ token: process.env.TOKEN });

let nowplaying = require("nowplaying");
let lastStatusWeSet = "";
let enableStatusUpdates = true;

let slackStatus = {
    get: () => {
        return slack.users.profile.get({});
    },

    setNowPlaying: (songInfo) => {
        slack.users.profile.set({
            profile: {
                "status_text": songInfo,
                "status_emoji": ":musical_note:"
            }
        });

        lastStatusWeSet = songInfo;
    },

    clear: () => {
        slack.users.profile.set({
            profile: {
                "status_text": "",
                "status_emoji": ""
            }
        });
    }
}

let buildSongInfoLine = (data) => {
    let albumArtistLine = data.artist !== data.albumArtist ? `${data.albumArtist}/` : "";
    return `${data.artist} - ${data.name} [${albumArtistLine}${data.album}/${data.year}]`;
}

nowplaying.on("playing", (data) => {
    slackStatus.get().then((resp) => {
        let currentStatus = resp.profile.status_text;
        console.log("current status:", currentStatus);
        //only write the status if empty or it's a previous music status we set
        if (currentStatus === "" || lastStatusWeSet === currentStatus) {
            let songInfo = buildSongInfoLine(data);

            console.log("set status to:", songInfo);
            slackStatus.setNowPlaying(songInfo);
            enableStatusUpdates = true;
        } else {
            console.log("leaving status alone, it's been set externally.");
            enableStatusUpdates = false;
        }
    });
});

nowplaying.on("paused", (data) => {
    if (enableStatusUpdates) {
        console.log("paused! clearing status.");
        slackStatus.clear();
    } else {
        console.log("paused, but status updates disabled due to direct status edit");
    }
});
