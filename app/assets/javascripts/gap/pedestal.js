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
    //console.log('fill');
    var t = this;
    var showcard = false;
    var showcard_which = [false,false,false,false,false,false];
    if(t.p.event_by_period[gap.pos-1][0] > 0)
    {
      if(cardshown[0]==-3 || cardshown[0] == gap.pos-1) 
      {
        cardshown[0] = gap.pos-1;
        showcard_which[0] = true; 
        showcard = true;         
      }  
      for(j = 1; j <= t.p.event_by_period[gap.pos-1][0]; ++j)
      {
        t.sp.find('div.interestB[data-id=1]')
          .append($('<div data-id=' + (t.p.treasure[0]+j) + '>')
            .addClass('tip item ' + interest[0].class)
            .attr({'data-tip':interest[0].descr + '\n' + interest[0].cost, 'data-tip-type':'coin' }).css({ opacity: 0 }).animate({opacity:1},1000));    

      }
      t.p.treasure[0]+=t.p.event_by_period[gap.pos-1][0];
    }

    for(i = 0; i < 5; ++i)
    {
      if(t.p.mutate_by_period[gap.pos-1][i] > 0)
      {
        //console.log('mut_count',t.p.mutate_by_period[gap.pos-1][i],t.title);
        var mut = t.p.mutate_by_period[gap.pos-1][i];
        for(j = t.p.treasure[i]; j > t.p.treasure[i]-mut; --j)
        {
          t.sp.find('div.interestB[data-id=' + (i+1) + '] div.item[data-id=' + j + ']').fadeOut(1000,function(){ $(this).remove(); });
        }
        t.p.treasure[i]-=mut;
        //console.log(t.p.treasure,t.p.title);
      }

      if(t.p.event_by_period[gap.pos-1][i+1] > 0)
      {
        if(cardshown[i+1]==-3 || cardshown[i+1] == gap.pos-1) 
        {
          //console.log('here second');
          cardshown[i+1] = gap.pos-1;
          showcard_which[i+1] = true; 
          showcard = true;         
        }         
        for(j = 1; j <= t.p.event_by_period[gap.pos-1][i+1]; ++j)
        {
          t.sp.find('div.interestB[data-id=' + (i+2) + ']')
            .append($('<div data-id=' + (t.p.treasure[i+1]+j) + '>')
              .addClass('tip item ' + interest[i+1].class)
              .attr({'data-tip':interest[i+1].descr + '\n' + interest[i+1].cost, 'data-tip-type':'coin' }).css({ opacity: 0 }).animate({opacity:1},1000));    
        }
        t.p.treasure[i+1]+=t.p.event_by_period[gap.pos-1][i+1];
      }
    }
    if(showcard)
    {
      t.p.card.show(showcard_which);      
    }
    this.p.queue.resume();      
  }  
  this.down = function() // go back one step calculate data based on pos
  {
    this.resume_by_position();
  };
  // this.next = function(v)
  // {     
  //   this.up(1,this.p.event_by_month[v]);
  // };
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
  // this.resume = function(states)
  // {
  //   var t = this;
  //   if(typeof states !== Array && states.length != 6) return;
  //   for(var i = 0; i < 6; ++i)
  //   {
  //     var state = states[i];
  //     var parent = t.sp.find('> div.interestB[data-id=' + (i+1) + ']').empty();
  //     for(var j = 0; j < state; ++j)
  //     {
  //       var item = $('<div data-id=' + (j+1) + '>').addClass('tip item ' + interest[i].class).attr({ 'data-tip': interest[i].descr + '\n' + interest[i].cost, 'data-tip-type':'coin' } ); 
  //       parent.append(item);
  //     }
  //     treasure[i] = state;
  //   }
  // };  
  this.resume_by_position = function()
  {
    
    var t = this;
    var states = [0,0,0,0,0,0];

    if(gap.pos >= 1)
    {
      //console.log('resume_by_position',gap.pos-1,t.p.treasure_by_period[gap.pos-1]);
      states = t.p.treasure_by_period[gap.pos-1].slice();
      //console.log('resume_by_position',t.p.treasure_by_period[gap.pos-1],gap.pos-1);
    }

    for(var i = 0; i < 6; ++i)
    {
      var parent = t.sp.find('> div.interestB[data-id=' + (i+1) + ']').empty();
      for(var j = 0; j < states[i]; ++j)
      {
        var item = $('<div data-id=' + (j+1) + '>').addClass('tip item ' + interest[i].class).attr({ 'data-tip': interest[i].descr + '\n' + interest[i].cost, 'data-tip-type':'coin' } ); 
        parent.append(item);
      }
    }
    t.p.treasure = states;
  };  
}