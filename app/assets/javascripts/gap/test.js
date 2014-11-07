var a = new Audio('/assets/gap/sounds/long.mp3');
var b = new Audio('http://www.tonycuffe.com/mp3/tail%20toddle.mp3');

a.addEventListener('loadeddata', function(){a.currentTime = 10; a.play(); }, true);
b.addEventListener('loadeddata', function(){b.currentTime = 10; b.play(); }, true);
