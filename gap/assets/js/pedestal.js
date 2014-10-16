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
  
  this.add = function(which,how)
  {
    console.log("Adding",which,how);
    var t = this;
    var start = t.p.treasure[0]-how;
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