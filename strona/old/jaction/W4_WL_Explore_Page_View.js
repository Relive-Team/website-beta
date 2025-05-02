function AT_tags(){
  try{var tags = new Array();
    var imgs = new Array();
    tags = ['img.atdmt.com/images/pixel.gif','http://switch.atdmt.com/action'];
    for(var i=0; i<tags.length; i++)
    { imgs[i] = new Image();
      imgs[i].src = tags[i];}
    this.csk='Test';
  }catch(e){this.csk='Error';}}
var AT_csk = new AT_tags();