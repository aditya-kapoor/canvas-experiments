var Canvas = {
  initialize: function(canvas_class){
    this.$canvas = $(canvas_class);
    this.canvas_context = this.$canvas[0].getContext('2d');
    this.canvas_context.fillStyle = "#123";
    this.canvas_context.beginPath();
    CanvasEventTracker.initialize(this.$canvas);
  },
  bindEvents: function(){
    _this = this;
    this.$canvas.click(function(event){
      var offset = $(this).offset();
      var eventX = event.clientX - offset.left;
      var eventY = event.clientY - offset.top;
      var canvas_event = new CanvasEvent('left', eventX, eventY);
      _this.handleEvent(canvas_event);
    })
  },
  handleEvent: function(canvas_event) {
    this.canvas_context.lineTo(canvas_event.X, canvas_event.Y);
    // this.canvas_context.moveTo(canvas_event.X, canvas_event.Y);
    this.canvas_context.stroke();
    this.canvas_context.fill();
    CanvasEventTracker.events.push(canvas_event)
  }
}

var CanvasEventTracker = {
  initialize: function($canvas_element){
    this.events          = [];
    this.$canvas_element = $canvas_element;
  }
}

var CanvasEvent = function(event_type, x_coordinate, y_coordinate){
  this.type = event_type;
  this.X    = x_coordinate;
  this.Y    = y_coordinate;
}

$(document).ready(function(){
  Canvas.initialize('.canvas');
  Canvas.bindEvents();
})