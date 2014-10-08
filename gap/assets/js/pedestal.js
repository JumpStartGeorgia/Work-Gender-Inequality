function pedestalObject(p)
{
  this.p = p;
  var treasure = p.treasure; // achievements per item in interest  
  var fromTreasureBarToCardPath = "M 0.0473509,55.968433 C 22.205826,24.60457 55.704178,5.2051051 100.0051,0.03123545";
  this.mutation = [{},{},{},{},{},{}]; 
  this.mutation_empty = [{},{},{},{},{},{}]; 
  this.mutation_count = 0;
  
  this.sp = null;
  this.mutationDone = true;
  this.up_stack = [];
  

  this.up = function(hidden)
  { 
    var how = this.p.event_by_period[pos];
    if(typeof hidden === undefined) hidden = false;
    //console.log(which,how,hidden);
    var t = this;
    var which = 1;
    var zIndex = 0;  // change from zero based
    treasure[zIndex]+=how;
    return;
    // if(!t.mutationDone) // todo delaying up till previous end
    // {
    //   t.up_stack.push({which:which,how:how,hidden:hidden});
    //   t.delay();
    //   return;
    // }

  
    if(t.inrange(which) && how > 0)
    {      
      var ca = treasure[zIndex]+how;
      var sm = states_mutation[zIndex];
      var smc = Math.floor10(ca/sm); 
      console.log(ca,sm,smc,treasure,how,mutation_restriction);
      var mutation_count = 0;
      t.mutation = t.mutation_empty.slice();

      if(!t.p.outrun) mutation_restriction[zIndex] = 0;

      if(t.p.outrun && smc > mutation_restriction[which]) 
      {
        //this.add(which,t.ach[zIndex],(smc - mutation_restriction[which]) * how);
        smc =  mutation_restriction[zIndex];
        mutation_restriction[zIndex] = 0;
      }
      
      if(smc >= 1)
      {
        
        mutation_count+=smc;
        t.mutation[zIndex] = { count: smc };

        var looper = smc;
        var tca = ca;        
        var interestB = t.sp.find('.interestB[data-id='+which+']');

        if(!t.p.outrun) mutation_restriction[zIndex] = smc;
        while(looper != 0)
        {
          var from = tca - sm;
          var to = tca - how;

          var beforeItem = interestB.find('.item[data-id=' + (from++) + ']');
          var wrapper = $('<div class="mutationB" data-id="'+looper+'" data-from="'+from+'" data-to="'+to+'"></div>');
          if(beforeItem.length == 0) 
             interestB.prepend(wrapper);
          else wrapper.insertAfter(beforeItem);

          for(var j = from; j <= to; ++j)
          {
            var item = interestB.find('.item[data-id=' + j + ']');            
            wrapper.append(item.detach());
          }
          tca-=sm;        
          --looper;
        }
        if(mutation_count > 0)// && this.p.title != 'Male')
        {
          //console.log(this.p,mutation_count);
          this.animatePathToCard(which);
          treasure[zIndex]-=mutation_count * sm;
        }
      }
      else
      {        
        this.add(which,treasure[zIndex],how);
      }
       treasure[zIndex]+=how;
      
    }
  };    
  this.animatePathToCard = function(which)
  {
    var t = this;
    var interestB = t.sp.find('.interestB[data-id='+which+']');    
    var pathTmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathTmp.setAttribute('d', fromTreasureBarToCardPath);
    var pathTmpLength = pathTmp.getTotalLength();

    var delay = 0;
    var dur = 1500;
    var muts = interestB.find('.mutationB');

    for(var j = muts.length-1; j >= 0; --j)
    {
      var mut = $(muts[j]);
      var from = + mut.attr('data-from');
      var to = + mut.attr('data-to');
      var cnt = to - from + 1;
      var cntTmp = cnt;
      var mut_start = mut.position().left;
      var first = mut.find('div.item[data-id=' + from + ']');

      var last = mut.find('div.item[data-id=' + to + ']');
      //console.log(last,to);
      var moveLeft = last.position().left;//- first.position().left;
      var widthScaler = (w*0.6 - moveLeft)/100;
      var heightScaler = (168 - 32)/56;

      for(var h = to; h >= from; --h)
      {
        var d = mut.find('div.item[data-id=' + h + ']');
        var left = moveLeft-d.position().left;
        d.css("position","relative").data('position',t.p.place);    
        if(h == to)
        {
          d.animate({'color':'#ffffff'},{duration:dur,
            progress:function(a,b,c){
              var coord = t.coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
              $(this).css({ left:coord.x, top:  (t.p.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
            },
            complete:function()
            {
              --cntTmp;
              transform.transform('scale', '.'+$(this).data('position')+' .card .coin .reward .item:nth-child(1)', { x:1.1,y:1.1 });  
            }
          }); 
        }
        else
        {
          d.data('ileft',left);
          d.delay(delay).animate({left:left},{ duration:500,
            complete:function()
            {
              $(this).animate({'color':'#ffffff'},{ duration:dur,
                progress:function(a,b,c){
                  var coord = t.coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
                  $(this).css({ left: +$(this).data('ileft') + coord.x , top: (t.p.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
                },
                complete:function()
                {
                  --cntTmp;
                  transform.transform('scale', '.'+$(this).data('position')+' .card .coin .reward .item:nth-child(1)', { x:1.1,y:1.1 });  
                  if(cntTmp == 0) 
                  {
                    mut.remove();
                  }  
                }
              }); 
            }
          });
        }
        delay+=300;
      }
    }         
  }
  this.coordinateFromPath = function(progress,path,pathLength,widthScaler,heightScaler)
  {
     var percent = Math.round10(progress*100);
      var p1 = path.getPointAtLength(pathLength * (percent-1)/100);
      var p2 = path.getPointAtLength(pathLength * (percent+1)/100);
      var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
      var p =  path.getPointAtLength(pathLength * percent/100);
      return { x:p.x*widthScaler,y:p.y*heightScaler, a:a };
  } 
  this.add = function(which,start,how)
  {
    var t = this;
    //console.log(this.p,which, start,how);
    var parent = t.sp.find('div.interestB[data-id=' + which + ']');
    for(var i = start+1; i <= start+how; ++i)
    {
      var item = $('<div data-id=' + i + '>').addClass('item i' + interest[which-1].class); 
      parent.append(item);
    }
  };
  this.down = function() // go back one step calculate data based on pos
  {
    var t = this;
    var states = [0,0,0,0,0,0];
    t.mutation = t.mutation_empty;
    var treasure_count = 0;
    for(var i = 0; i < pos*reward_period; ++i)
      treasure_count += this.p.event_by_month[i];

    var state_cost = 0; 
    states_mutation.forEach(function(d,i){ state_cost+=d; });
    for(var i = 5; i > 0; --i)
    {
      state_cost-=states_mutation[i];
      //console.log(state_cost);
      var tmp =  Math.floor10(treasure_count/state_cost);
      if(t.p.outrun && tmp > mutation_restriction[i])
      {
        tmp =  mutation_restriction[i];
        mutation_restriction[i] = 0;      
      }
      if(tmp >= 1)
      {
        states[i] = tmp;
        treasure_count -= tmp * state_cost;
      }
    }
    states[0] = treasure_count;

    if(!t.p.outrun) mutation_restriction = states;

    this.resume(states);
  };
  this.next = function(v)
  {     
    this.up(1,this.p.event_by_month[v]);
  };
  this.prev = function(v)
  {     
    this.down();
  };
  this.move = function()
  {  
    pos > prev_pos ? this.up() : this.down();
  };
  this.delay = function()
  {
    //console.log("delaying");
    var t = this;
    setTimeout(function()
    {        
      if(t.mutationDone)
      {
        var item = t.up_stack.shift();
        t.up(item.which,item.how,item.hidden);
      }
      else
      {
        t.delay();
      }          
    },1000);      
  }; 


  this.inrange = function(which)
  {
    if(which >=1 && which < 6)
      return true;
    return false;
  };
  this.init = function()
  {    
    var t = this;
    this.sp = $('.' + this.p.place + ' .treasure .pedestal');
    treasure.forEach(function(d,i){
      t.sp.append('<div class="interestB" data-id="'+(i+1)+'">');
    }); 
  };
  this.resume = function(states)
  {
    var t = this;
    if(typeof states !== Array && states.length != 6) return;

    for(var i = 0; i < 6; ++i)
    {
      var state = states[i];
      // if(i != 5)        
      // {
      //   var sm = states_mutation[i]; // state mutation for current interest item                 
      //   state -= Math.floor10(state/sm) * sm;
      // }
      var parent = t.sp.find('> div.interestB[data-id=' + (i+1) + ']').empty();
      for(var j = 0; j < state; ++j)
      {
        var item = $('<div data-id=' + (j+1) + '>').addClass('item i' + interest[i].class); 
        parent.append(item);
      }
      treasure[i] = state;
    }
  };   
}








/*
  this.prepare_mutator = function()
  {
    // preparations
    var t = this;
    //console.log(mutation_restriction,t.p.outrun);
    var mutation_count = 0;
    t.mutation = t.mutation_empty;
    for(var i = 0; i < 5; ++i)
    {
      var ca = treasure[i];
      var sm = states_mutation[i];
      var smc = Math.floor10(ca/sm); 
          
      t.mutation[i] = { count: 0 };
      if(!t.p.outrun) mutation_restriction[i] = 0;
      if(smc >= 1)
      {
       
        if(t.p.outrun && smc > mutation_restriction[i]) 
        {
          smc =  mutation_restriction[i];
          mutation_restriction[i] = 0;
        }
        mutation_count+=smc;
        var looper = smc;
        var tmpA = [];
        var tca = ca;        
        var interestB = t.sp.find('.interestB[data-id='+(i+1)+']');
        t.mutation[i] = { count: smc };

        if(!t.p.outrun) mutation_restriction[i] = smc;

        while(looper != 0)
        {
          var from = tca - sm;
          var to = tca;

          var beforeItem = interestB.find('.item[data-id=' + (from++) + ']');
          var wrapper = $('<div class="mutationB" data-id="'+looper+'"></div>');
          if(beforeItem.length == 0) 
             interestB.prepend(wrapper);
          else wrapper.insertAfter(beforeItem);

          for(var j = from; j <= to; ++j)
          {
            var item = interestB.find('.item[data-id=' + j + ']');            
            wrapper.append(item.detach());
          }
          t.up(i+2,1,true);
          //console.log(smc);
          tca-=sm;        
          --looper;
        }
       
      }
    }
    // play mutation
    if(mutation_count > 0)
    {
      t.mutationDone = false;
      setTimeout(function(){ t.mutate();},1000);
    }
    //console.log(t.ach);
  }; 
  this.mutate = function()
  {
    var t = this;
    var dur = 2000;     
    t.mutation.forEach(function(d,i)
    { 
      var hiddens = t.sp.find('.interestB[data-id='+(i+1)+'] .item.hidden');
      if(d.count > 0)
      {
        if(hiddens.length != 0)
        {
          hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur,function(){
            for(var j = 1; j <= d.count; ++j)
            {
              t.sp.find('> div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                this.remove();
              });            
            }          
          });              
        }      
        else
        {
          for(var j = 1; j <= d.count; ++j)
          {
              t.sp.find('> div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                this.remove();
              });            
          }  
        }  
        treasure[i]-=d.count*states_mutation[i];          
      }
      else 
      {
         hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur,function(){t.mutationDone = true;});
      }
    });
  };
 */