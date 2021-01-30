 /**
       <div class="play-wraper">
         <button class="prev" @click="$musicPlayer().prev()">
           <i class="iconfont icon-music-prev"></i>
         </button>
         <div class="player-box">
           <div :class="['song-box', { playing: playing }]">
             <img :src="currentSong.poster" alt="" class="poster" />
           </div>
           <button class="toggle-btn" @click="$musicPlayer().togglePlay()">
             <i class="iconfont icon-music-pause" v-if="playing"></i>
             <i class="iconfont icon-music-play" v-else></i>
           </button>
         </div>
         <button class="next" @click="$musicPlayer().next()">
           <i class="iconfont icon-music-next"></i>
         </button>
       </div>
       **/