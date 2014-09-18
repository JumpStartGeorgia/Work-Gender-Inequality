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
  _tsalary = 0; // total salary
  _tsaved = 0; // total saved
  _stage = [];


  this.position = function position(coord) {
    //  console.log(current_path_width,this.land,coord);
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;
console.log("width",current_path_width);
      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
      $(this.selector).css({ left: this.x + stage_offset, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  };

  this.positionXYA = function positionXYA(x,y,a) {
      var scaleX = $(document).width()/100;
      var scaleY = (h2-th/2)/56;

      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }

      $(this.selector).css({ left: this.x, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

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
  this.__defineGetter__("tsalary", function(){
      return _tsalary;
  });
 
  this.__defineSetter__("tsalary", function(val){
      _tsalary = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsalary .value').text(val);
  });

this.__defineGetter__("tsaved", function(){
      return _tsaved;
  });
 
  this.__defineSetter__("tsaved", function(val){
      _tsaved = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsaved .value').text(val);
  });

  this.__defineGetter__("stage", function(){
      return _stage;
  });
 
  this.__defineSetter__("stage", function(val){
      _stage = val;
  });


}; // human object with basic properties