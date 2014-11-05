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
    var t = this;
    var start = t.p.treasure[which-1]-how;
    var parent = t.sp.find('div.interestB[data-id=' + which + ']');
    for(var i = start+1; i <= start+how; ++i)
    {
      var item = $('<div data-id=' + i + '>').addClass('item ' + interest[which-1].class); 
      parent.append(item);
    }
  };
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
    pos > prev_pos ? this.up() : this.down();
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
        var item = $('<div data-id=' + (j+1) + '>').addClass('item ' + interest[i].class); 
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
    for(var i = 0; i < pos; ++i)
      treasure_count += this.p.event_by_period[i];
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