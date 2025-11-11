(function(){
  const audio = document.getElementById('player');
  const rateLabel = document.querySelector('.rate');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  function updateRateLabel(){ rateLabel && (rateLabel.textContent = `Velocidade: ${audio.playbackRate.toFixed(2)}×`); }
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]'); if(!btn || !audio) return;
    const action = btn.getAttribute('data-action');
    if(action === 'rewind'){ audio.currentTime = Math.max(0, audio.currentTime - 10); }
    else if(action === 'forward'){ audio.currentTime = Math.min(audio.duration || audio.currentTime + 10, audio.currentTime + 10); }
    else if(action === 'playpause'){ if(audio.paused) audio.play(); else audio.pause(); }
    else if(action === 'slower'){ audio.playbackRate = clamp((audio.playbackRate - 0.1), 0.5, 2.0); updateRateLabel(); }
    else if(action === 'faster'){ audio.playbackRate = clamp((audio.playbackRate + 0.1), 0.5, 2.0); updateRateLabel(); }
  }, false);
  audio && audio.addEventListener('ratechange', updateRateLabel);
  audio && audio.addEventListener('loadedmetadata', updateRateLabel);
})();