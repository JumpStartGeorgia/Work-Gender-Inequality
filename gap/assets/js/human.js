
function human(selector,title) 
{

  this.title = exist(title) ? title : "Human";
  this.age = 0;
  this.height = 100;
  this.width = 46;
  this.canvas = 200;
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.land = 0;  
  this.selector = selector;
  this._salary = 0;
  this._saved = 0;
  this._tsalary = 0; // total salary
  this._tsaved = 0; // total saved
  this._stage = [];
  this.inside = false;
  this.items = [];
  this.outrun = false;
  this.gap_percent = 0;
  this.saving_for_tick = 0;


  this.position = function position(coord) {
    //  console.log(current_path_width,this.land,coord);
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;
      
      //console.log("width",current_path_width);
      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
      $(this.selector).css({ left: this.x + stage_offset, top: this.y });
      //var t = this;
      //if(this.title=='Male')
       // transform.transform('rotate', this.selector, { a: this.angle });
      //$(this.selector).queue(function(){  }).dequeue();

      //,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  };
  this.lookinfuture = function lookinfuture(coord)
  {
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;
      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
     // $(this.selector).css({ left: , top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title , x:this.x + stage_offset, y:this.y };
  };
  this.toground = function toground() 
  {
    var half = (h-th)/2;
    this.land = half;
    this.y = half - this.height;
  };

  //setters and getters  
  this.__defineGetter__("salary", function(){
      return this._salary;
  });
  this.__defineSetter__("salary", function(val){
      this._salary = val;      
  });
  this.__defineGetter__("saved", function(){
      return this._saved;
  });
  this.__defineSetter__("saved", function(val){
      this._saved = val;
  });
  this.__defineGetter__("tsalary", function(){
      return this._tsalary;
  });
  this.__defineSetter__("tsalary", function(val){
      this._tsalary = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsalary .value').text(val);
  });
  this.__defineGetter__("tsaved", function(){
    //console.log("getter tsaved ", this._tsaved);
        return this._tsaved;
    });
  this.__defineSetter__("tsaved", function(val){
    //console.log("setterrrrrrrrrrr tsaved",this._tsaved,val);
      this._tsaved = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsaved .value').text(val);
  });
  this.__defineGetter__("stage", function(){
      return this._stage;
  });
  this.__defineSetter__("stage", function(val){
      this._stage = val;
  });
}; // human object with basic properties
var male = new human('.m.character','Male'); // male human object
var female = new human('.f.character','Female'); // female human object





  // this.positionXYA = function positionXYA(x,y,a) {
  //     var scaleX = $(document).width()/100;
  //     var scaleY = (h2-th/2)/56;

  //     if(exist(coord))
  //     {
  //       if(exist(coord.x)) this.x = coord.x*scaleX;
  //       if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
  //       if(exist(coord.a)) this.angle = coord.a;
  //     }

  //     $(this.selector).css({ left: this.x, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

  //     //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
  //     return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  // };