(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/music.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dda42/obkNFgoHji6AEYuX7', 'music', __filename);
// scripts/music.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        music: {
            type: cc.AudioClip,
            default: null
        },
        mgr: cc.Node,
        item: cc.Prefab
    },

    onLoad: function onLoad() {
        console.log(this.music);

        this.n = 128;
        // all items
        var w = 1280;
        for (var i = 0; i < this.n; i++) {
            var item = cc.instantiate(this.item);
            this.mgr.addChild(item);
            var width = item.width;
            item.height = 5;
            item.y = 0;
            item.x = -(this.n / 2) * (width + 4) + i * width + i * 4 + width / 2;
        }

        this.eddyStyle();

        // Handle different platforms
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    },
    circleStyle: function circleStyle() {
        var value_R = 120;
        var angle = 360 / this.n;
        var all_item = this.mgr.children;
        for (var i = 0; i < this.n; i++) {
            var item = all_item[i];
            var value_angle = (i - Math.floor(this.n / 2)) * angle;
            var _pos = this.calculatePosition(value_angle, value_R);
            item.angle = -value_angle;
            item.x = _pos.x;
            item.y = _pos.y;
        }
    },
    eddyStyle: function eddyStyle() {
        var value_R = 200;
        var angle = 360 / this.n;
        var all_item = this.mgr.children;
        for (var i = 0; i < this.n; i++) {
            var item = all_item[i];
            var value_angle = (i - Math.floor(this.n / 2)) * angle;
            var _pos2 = this.calculatePosition(value_angle, value_R);
            item.angle = -value_angle;
            item.x = _pos2.x;
            item.y = _pos2.y;

            value_R -= 0.5;
        }
    },
    sinStyle: function sinStyle() {
        var value_R = 120;
        var angle = 360 / this.n;
        var all_item = this.mgr.children;
        for (var i = 0; i < this.n; i++) {
            var item = all_item[i];
            var value_angle = (i - Math.floor(this.n / 2)) * angle;
            var x = (i - Math.floor(this.n / 2)) * item.width * 2;
            var y = x * sin;
            item.angle = -value_angle;
            item.x = pos.x;
            item.y = pos.y;

            value_R -= 0.5;
        }
    },
    onClick: function onClick() {
        var AudioContext = window.AudioContext;
        // audioContext is only equivalent to a container.
        var audioContext = new AudioContext();
        // To make the audioContext really rich, you need to pass it the actual music information.
        // That is, the AudioBuffer data is passed in.
        // Here's how to create an audio resource node manager.
        this.audioBufferSourceNode = audioContext.createBufferSource();
        // Pass AudioBuffer in.
        this.audioBufferSourceNode.buffer = this.music._audio;
        // Create the analyzer.
        this.analyser = audioContext.createAnalyser();
        // precision setting
        this.analyser.fftSize = 256;
        // Connect to the analyzer before passing to the speaker.
        this.audioBufferSourceNode.connect(this.analyser);
        // Connect to speakers.
        this.analyser.connect(audioContext.destination);
        // Start playing
        this.audioBufferSourceNode.start(0);
    },
    onStop: function onStop() {
        this.audioBufferSourceNode.stop();
    },
    update: function update(dt) {
        // wait for it to be ready
        if (!this.analyser) return;
        // Create data and accept data
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        // The analysis results are stored in an array.
        this.analyser.getByteFrequencyData(this.dataArray);
        this.draw(this.dataArray);
    },
    draw: function draw(dataArray) {
        // value customization
        // 960/40 has 24; 128/this.n gets 1
        var count = 0;
        for (var i = 0; i < this.n; i++) {
            var h = dataArray[i] / 2;
            if (h < 5 / 2) {
                count++;
                h = dataArray[i - count] / 2;
                h = 5;
            }
            //h = 5;
            this.mgr.children[i].height = h;
        }
    },
    calculatePosition: function calculatePosition(angle, r) {
        angle = angle * (Math.PI / 180);
        var x = r * Math.sin(angle);
        var y = r * Math.cos(angle);
        return cc.v2(x, y);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=music.js.map
        