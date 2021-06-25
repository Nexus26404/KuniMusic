var app = new Vue({
    el: "#app",
    data: {
        // 查询关键字
        query: "",
        // 歌曲列表
        musicList: [],
        // 播放地址
        musicUrl: "",
        // 歌曲封面
        musicCover: "",
        // 歌曲评论
        hotComments: [],
        // 唱片旋转状态
        isPlaying: false,
        // mv地址
        mvUrl: "",
        // 遮罩层的显示状态
        isShow: false
    },
    methods: {
        // 搜索歌曲
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function(response) {
                // console.log(response);
                that.musicList = response.data.result.songs;
            }, function(err) {})
        },
        playMusic: function(musicId) {
            // 歌曲播放
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function(response) {
                // console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            }, function(err) {});
            // 歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function(response) {
                that.musicCover = response.data.songs[0].al.picUrl;
            }, function(err) {});
            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function(response) {
                // console.log(response);
                // console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            }, function(err) {})
        },
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        // 播放MV
        playMv: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                function(response) {
                    // console.log(response);
                    // console.log(response.data.data.url);
                    that.mvUrl = response.data.data.url;
                    that.isShow = true;
                    that.musicUrl = "";
                    that.isPlaying = false;
                },
                function(err) {}
            )
        },
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        }

    }
})