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
  this.anim_counter = 0;
  this.toShow = false;
  this.toShowValues = [false,false,false,false,false,false];
  this.add = function(which,how)
  {
    var t = this;
    var start = t.p.treasure[which-1]-how;
    var parent = t.sp.find('div.interestB[data-id=' + which + ']');
    for(var i = start+1; i <= start+how; ++i)
    {
      var item = $('<div data-id=' + i + '>').addClass('tip item ' + interest[which-1].class).attr({'data-tip':interest[which-1].descr + '\n' + interest[which-1].cost, 'data-tip-type':'coin' }); 
      parent.append(item);
    }
  };
  this.fill = function()
  {
    var t = this;
    t.anim_counter = 0;
    t.toShow = false;
    t.toShowValues = [false,false,false,false,false,false];
    for(i = 0; i < 6; ++i)
    {
      if(t.p.event_by_period[gap.pos][i] > 0)
      {
        if(!t.p.cardshown[i]) 
        {
          t.p.cardshown[i] = true;
          t.toShowValues[i] = true; 
          t.toShow = true;         
        }
        var start = t.p.treasure[i];
        t.p.treasure[i]+=t.p.event_by_period[gap.pos][i];
        var parent = t.sp.find('div.interestB[data-id=' + (i+1) + ']');
        for(j = start+1; j <= start+t.p.event_by_period[gap.pos][i]; ++j)
        {
          parent.append($('<div data-id=' + j + '>').addClass('tip item ' + interest[i].class).attr({'data-tip':interest[i].descr + '\n' + interest[i].cost, 'data-tip-type':'coin' }));
          ++t.anim_counter;
          parent.find('div[data-id=' + j + ']').hide()
          .fadeIn({
            duration:400,           
            complete:function(){ t.anim_completed(); } 
          });
        }
      }
    }        
  }
  this.anim_completed = function()
  {
    var t = this;
    --t.anim_counter;
    if(t.anim_counter==0)
    {
      for(i = 0; i < 5; ++i)
      {  
        while(t.p.treasure[i] >= mutation_step[i])
        {
          if(!t.p.cardshown[i+1]) 
          {
            t.p.cardshown[i+1] = true;
            t.toShowValues[i+1] = true; 
            t.toShow = true;         
          }  

          var curCount = t.p.treasure[i];
          for(j = 0; j < mutation_step[i]; ++j)
          {
            t.sp.find('div.interestB[data-id=' + (i+1) + '] div.item[data-id=' + curCount-- + ']').fadeOut(1000,function(){ $(this).remove(); });
          } 
          t.sp.find('div.interestB[data-id=' + (i+2) + ']')
          .append($('<div data-id=' + (t.p.treasure[i+2]+1) + '>')
            .addClass('tip item ' + interest[i+1].class)
            .attr({'data-tip':interest[i+1].descr + '\n' + interest[i+1].cost, 'data-tip-type':'coin' }))
          .hide().fadeIn(5000);    

          ++t.p.treasure[i+1];
          t.p.treasure[i]-=mutation_step[i]; // remove 
        }
      }
      if(t.toShow)
      {
        t.p.card.show(t.toShowValues);      
      }
      this.p.queue.resume();  
    }
  }
  this.down = function() // go back one step calculate data based on pos
  {
    this.resume_by_position();
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
    gap.pos > prev_pos ? this.up() : this.down();
  };
  this.delay = function()
  {
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
      var parent = t.sp.find('> div.interestB[data-id=' + (i+1) + ']').empty();
      for(var j = 0; j < state; ++j)
      {
        var item = $('<div data-id=' + (j+1) + '>').addClass('tip item ' + interest[i].class).attr({ 'data-tip': interest[i].descr + '\n' + interest[i].cost, 'data-tip-type':'coin' } ); 
        parent.append(item);
      }
      treasure[i] = state;
    }
  };  
  this.resume_by_position = function()
  {
    var t = this;
    var p = t.p;
    var states = [0,0,0,0,0,0];
    var treasure_count = 0;
    for(var i = 0; i < gap.pos; ++i)
      treasure_count += this.p.event_by_period_sum[i];
    for(var i = 5; i > 0; --i)
    {
      var tmp =  Math.floor10(treasure_count/states_mutation_based[i-1]);
      if(p.outrun)
      {
        var restrictor = p.oppenent.hasLevelMutation(i-1);
        if(tmp > restrictor) { tmp = restrictor; }
      }

      if(tmp >= 1)
      {
        states[i] = tmp;
        treasure_count -= tmp * states_mutation_based[i-1];
      }
    }
    states[0] = treasure_count;
   
    this.resume(states);
  };  
}