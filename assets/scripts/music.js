
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

    onLoad () {
        console.log(this.music);

        this.n = 128;
        // all items
        let w = 1280;
        for (let i = 0; i < this.n; i++) {
            let item = cc.instantiate(this.item);
            this.mgr.addChild(item);
            let width = item.width;
            item.height = 5;
            item.y = 0;
            item.x = -(this.n/2)*(width + 4) + i * width + i*4 + width/2;
        }

        this.eddyStyle();
        
        // Handle different platforms
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    },

    circleStyle(){
        let value_R = 120;
        let angle = 360/this.n;
        let all_item = this.mgr.children;
        for(let i = 0; i < this.n; i++){
            let item = all_item[i];
            let value_angle = (i - Math.floor(this.n/2))*angle;
            let pos = this.calculatePosition(value_angle,value_R);
            item.angle = -value_angle;
            item.x = pos.x;
            item.y = pos.y;
        }
    },

    eddyStyle(){
        let value_R = 200;
        let angle = 360/this.n;
        let all_item = this.mgr.children;
        for(let i = 0; i < this.n; i++){
            let item = all_item[i];
            let value_angle = (i - Math.floor(this.n/2))*angle;
            let pos = this.calculatePosition(value_angle,value_R);
            item.angle = -value_angle;
            item.x = pos.x;
            item.y = pos.y;

            value_R -= 0.5;
        }
    },

    sinStyle(){
        let value_R = 120;
        let angle = 360/this.n;
        let all_item = this.mgr.children;
        for(let i = 0; i < this.n; i++){
            let item = all_item[i];
            let value_angle = (i - Math.floor(this.n/2))*angle;
            let x = (i - Math.floor(this.n/2))*item.width*2;
            let y = x*sin
            item.angle = -value_angle;
            item.x = pos.x;
            item.y = pos.y;

            value_R -= 0.5;
        }
    },

    onClick () {
        let AudioContext = window.AudioContext;
        // audioContext is only equivalent to a container.
        let audioContext = new AudioContext();
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

    onStop () {
        this.audioBufferSourceNode.stop();
    },

    update (dt) {
         // wait for it to be ready
        if (!this.analyser) return;
        // Create data and accept data
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        // The analysis results are stored in an array.
        this.analyser.getByteFrequencyData(this.dataArray);
        this.draw(this.dataArray);
    },

    draw (dataArray) {
        // value customization
        // 960/40 has 24; 128/this.n gets 1
        let count = 0;
        for (let i = 0; i < this.n; i++) {
            let h = dataArray[i]/2;
            if (h < 5/2){
                count++;
                h = dataArray[i - count]/2;
                h = 5;
            }
            //h = 5;
            this.mgr.children[i].height = h;
        }
    },

    calculatePosition(angle,r){
        angle = angle*(Math.PI/180);
        let x = r * Math.sin(angle);
        let y = r * Math.cos(angle);
        return cc.v2(x,y);
    },

});
