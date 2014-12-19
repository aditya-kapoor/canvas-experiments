var Canvas = {
  initialize: function(canvas_class, table_class){
    this.$coordinate_table = $(table_class)
    this.$canvas = $(canvas_class);
    this.canvas_context = this.$canvas[0].getContext('2d');
    this.canvas_context.beginPath();
    this.canvas_context.fillStyle = "#fff123";
    this.canvas_context.save();
    CanvasEventTracker.initialize(this.$canvas, $('.area'));

  },
  bindEvents: function(){
    _this = this;
    this.$canvas.click(function(event){
      var offset = $(this).offset();
      var eventX = event.clientX - offset.left;
      var eventY = event.clientY - offset.top;
      var canvas_event = new CanvasEvent('left', eventX, eventY);
      _this.handleEvent(canvas_event);
      CanvasEventTracker.events.push(canvas_event)
      _this.updateTable(canvas_event)
      if(CanvasEventTracker.events.length >= 3) {
        CanvasEventTracker.calculateArea();
      }
    })
  },
  handleEvent: function(canvas_event) {
    this.canvas_context.lineTo(canvas_event.X, canvas_event.Y);
    // this.canvas_context.moveTo(canvas_event.X, canvas_event.Y);
    this.canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.canvas_context.save();
    this.canvas_context.stroke();
    this.canvas_context.fill();

  },
  updateTable: function(canvas_event) {
    this.$coordinate_table.append(
      $('<tr />').append(
        $('<td />').text(canvas_event.X)
      ).append(
        $('<td />').text(canvas_event.Y)
      )
    )
  }
}

var CanvasEventTracker = {
  initialize: function($canvas_element, $area_div){
    this.events          = [];
    this.$canvas_element = $canvas_element;
    this.$area_div = $area_div
  },
  calculateArea: function() {
    area = 0
    for(i=0;i<this.events.length;++i){
      if(i == this.events.length - 1){
        var looping_pair = [this.events[i], this.events[0]]
      } else {
        var looping_pair = [this.events[i], this.events[i+1]]
      }
      exp        = 0.5*((looping_pair[0].X * looping_pair[1].Y) - (looping_pair[1].X * looping_pair[0].Y))
      area += exp;
    }
    console.log(Math.abs(area))
    this.$area_div.html("Area - " + Math.abs(area))
  }
}

var CanvasEvent = function(event_type, x_coordinate, y_coordinate){
  this.type = event_type;
  this.X    = x_coordinate;
  this.Y    = y_coordinate;
}

$(document).ready(function(){
  Canvas.initialize('.canvas', '.coordinates_table');
  Canvas.bindEvents();
})














$(function() {
    var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            // drawStuff(); 
    }
    resizeCanvas();
});