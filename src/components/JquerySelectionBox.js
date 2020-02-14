import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "jquery-ui";
import "./newcss.css";
const JquerySelectionBox = props => {
  React.useEffect(() => {
    $(function() {
      var widget;
      var inner;
      var x;
      var y;
      var finX;
      var finY;
      var isleftdown = false;
      var isCtrlDown = false;

      var rotateDown = false;
      var ro;
      $(document).on("keydown", function(e) {
        if (e.metaKey || e.ctrlKey) {
          isCtrlDown = true;
        }
      });
      $(document).on(
        {
          mousedown: function(event) {
            event.preventDefault();
            switch (event.which) {
              case 1:
                console.log(isCtrlDown, "a");
                if ($(event.target).attr("class") == "wrapper") {
                  x = Math.floor(event.pageX / 50) * 50;
                  y = Math.floor(event.pageY / 50) * 50;
                  $(".wrapper").append(
                    '<div class="widget" style="top:' +
                      y +
                      "px; left: " +
                      x +
                      'px;"><div class="widget-inner"><i class="fas fa-sync-alt rotate"></i><div class="handle"></div><div class="resize-widget"></div><div class="remove-widget"></div></div></div>'
                  );
                  widget = $(".widget").last();
                  widget.css({ border: "2px dashed #ccc" });
                  inner = widget.find(".widget-inner");
                  inner.css({ background: "transparent !important" });
                  var $elSibs = widget.siblings(".widget");
                  // DETECT COLLISION
                  $elSibs.each(function() {
                    var self = this;
                    var $sib = $(self);
                    collision($sib, widget);
                  });
                  isleftdown = true;
                }
                if ($(event.target).hasClass("rotate")) {
                  console.log("truep");
                  rotateDown = true;
                  inner = $(event.target)
                    .closest(".widget")
                    .find(".widget-inner");
                }
                break;
            }
          },
          mousemove: function(event) {
            event.preventDefault();
            if (isleftdown == true) {
              if (!$(event.target).hasClass(".wrapper")) {
                finX = Math.floor(event.pageX / 50) * 50;
                finY = Math.floor(event.pageY / 50) * 50;
                widget.width(finX - x);
                widget.height(finY - y);
                widget.css({
                  width: finX - x + "!important",
                  height: finY - y + "!important",
                  display: "block"
                });
                var $elSibs = widget.siblings(".widget");
                // DETECT COLLISION
                $elSibs.each(function() {
                  var self = this;
                  var $sib = $(self);
                  collision($sib, widget);
                });
              }
            }
            if (rotateDown == true) {
              inner
                .closest(".widget")
                .find(".rotate")
                .css("display", "block");
              var widgetX = inner.offset().left + inner.outerWidth(true) / 2;
              var widgetY = inner.offset().top + inner.outerHeight(true) / 2;
              var deg = Math.atan2(
                event.pageY - widgetY,
                event.pageX - widgetX
              );
              console.log(deg, "j");
              inner.css("transform", "rotate(" + deg + "rad)");
            }
          },
          mouseup: function(event) {
            event.preventDefault();
            widget = $(".widget").last();
            var select = $(".select").last();
            var $elSibs = widget.siblings(".widget");
            inner.css({ background: "rgba(0,0,0,0.8)", outline: "0" });
            widget.css({ border: "0" });
            //init();
            var $elSibs = widget.siblings(".widget");
            widget.find(".remove-widget, .resize-widget, .add-item").show();
            if (isleftdown == true) {
              $elSibs.each(function() {
                var self = this;
                var $sib = $(self);
                collision($sib, widget);
                var result = collision($sib, widget);
                if (result == true) {
                  console.log($sib.attr("class"));
                  widget.remove();
                  $sib.find(".widget-inner").removeClass("collision");
                }
                isleftdown = false;
              });
            }
            isleftdown = false;
            rotateDown = false;
            inner
              .closest(".widget")
              .find(".rotate")
              .css("display", "none");
          },
          mouseover: function(event) {
            if ($(event.target).hasClass("widget")) {
              $(event.target);
              ro = $(event.target).find(".rotate");
              ro.css("display", "block");
            }
          }
        },
        ".wrapper"
      );

      $(document).on("mouseleave", ".widget", function() {
        var ro = $(this).find(".rotate");
        ro.css("display", "none");
      });

      // UI Initialization
      // var helper;
      // var xSave;
      // var ySave;
      // var xClose;
      // var yClose;
      // function init() {
      //   $(".widget").draggable({
      //     stack: ".widget",
      //     containment: "parent",
      //     grid: [50, 50],
      //     handle: ".handle",
      //     start: function(event, ui) {
      //       var $el = $(this);
      //       // save the start position for collision detection.
      //       xSave = $(this).position().left;
      //       ySave = $(this).position().top;
      //       var $el = $(this);
      //       var $elSibs = $(this).siblings(".widget");
      //       // DETECT COLLISION
      //       $elSibs.each(function() {
      //         var self = this;
      //         var $sib = $(self);
      //         collision($sib, $el);
      //       });
      //       // $elSibs.find('.widget-inner').css('background','#6490d1 !important');
      //     },
      //     drag: function(event, ui) {
      //       var $el = $(this);
      //       var $elSibs = $(this).siblings(".widget");
      //       // DETECT COLLISION
      //       $elSibs.each(function() {
      //         var self = this;
      //         var $sib = $(self);
      //         collision($sib, $el);
      //         var result = collision($sib, $el);
      //         if (!result == true) {
      //           // if ($el.position().left >= $sib.position().left + $sib.outerWidth(true)) {
      //           // 	console.log('whahhashashah');
      //           // 	xClose = Math.ceil($el.position().left / 50) * 50;
      //           // } else if ($el.position().left + $el.outerWidth(true) <= $sib.position().left ) {
      //           // 	console.log('whhhooooooooo');
      //           // 	xClose = Math.floor($el.position().left / 50) * 50;
      //           // }
      //           // if ($el.position().top >= $sib.position().top + $sib.outerHeight(true)) {
      //           // 	yClose = Math.ceil($el.position().top / 50) * 50;
      //           // // console.log($el.position().top);
      //           // } else if ( $el.position().top + $el.outerHeight(true) <= $sib.position().top) {
      //           // 	console.log('trueeeas');
      //           // 	yClose = Math.floor($el.position().top / 50) * 50;
      //           // }
      //           // $el.css({'top':xClose, 'left':yClose});
      //           // $sib.find('.widget-inner').removeClass('collision');
      //         }
      //       });
      //     },
      //     stop: function(event, ui) {
      //       var $el = $(this);
      //       var $elSibs = $(this).siblings(".widget");
      //       // DETECT COLLISION
      //       $elSibs.each(function() {
      //         var self = this;
      //         var $sib = $(self);
      //         collision($sib, $el);
      //         var result = collision($sib, $el);
      //         // if there is collision, we send back to start position.
      //         if (result == true) {
      //           console.log(yClose);
      //           console.log(xClose);
      //           // $el.css({'top':yClose, 'left':xClose});
      //           $el.css({ top: ySave, left: xSave });
      //           $sib.find(".widget-inner").removeClass("collision");
      //         }
      //         console.log(yClose, "h");
      //         console.log(xClose, "hg");
      //       });
      //     }
      //   });
      //   $(".widget").resizable({
      //     grid: [50, 50],
      //     containment: "parent",
      //     resize: function(event, ui) {
      //       var $el = ui.element;
      //       var $elSibs = $el.siblings(".widget");
      //       // DETECT COLLISION
      //       $elSibs.each(function() {
      //         var self = this;
      //         var $sib = $(self);
      //         collision($sib, $el);
      //       });
      //     },
      //     stop: function(event, ui) {
      //       // DETECT COLLISION
      //       var $el = ui.element;
      //       var $elSibs = ui.element.siblings(".widget");
      //       $elSibs.each(function() {
      //         var $sib = $(this);
      //         var x1 = $el.offset().left;
      //         var x2 = $sib.offset().left;
      //         var y1 = $el.offset().top;
      //         var y2 = $sib.offset().top;
      //         var result = collision($sib, $el);
      //         // if there is collision, we send back to start position.
      //         if (result == true) {
      //           $el.css("width", x2 - x1);
      //           // $el.css('height',y2 - y1);
      //           $sib.find(".widget-inner").removeClass("collision");
      //         }
      //       });
      //     }
      //   });
      // }
      // init();

      $(document).on("click", ".remove-widget", function() {
        $(this)
          .closest(".widget")
          .remove();
      });

      // $(document).on('click', '.pack', function() {
      // 	var widget = $('.wrapper').find('.widget');
      // 	widget.each(function() {
      // 		$(this).css({'position':'relative', 'float':'left', 'left':'auto', 'top':'auto'});
      // 	});
      // });

      // Collision Detection
      function collision($sib, $el) {
        var wigInner = $el.find(".widget-inner");
        var sibInner = $sib.find(".widget-inner");
        var x1 = wigInner.offset().left; // ui.element left position
        var y1 = wigInner.offset().top; // ui.element top position
        var h1 = wigInner.outerHeight(true); // ui.element outerHeight
        var w1 = wigInner.outerWidth(true); // ui.element outerWidth
        var b1 = y1 + h1; // ui.element "bottom" position
        var r1 = x1 + w1; // ui.element "right" position
        var x2 = sibInner.offset().left; // collided sibling left position
        var y2 = sibInner.offset().top; // collided sibling top position
        var h2 = sibInner.outerHeight(true); // collided sibling outerHeight
        var w2 = sibInner.outerWidth(true); // collided sibling outerWidth
        var b2 = y2 + h2; // collided sibling "bottom" position
        var r2 = x2 + w2; // collided sibling "right" position
        console.log(x1, y1, h1, w1, r1);
        // CHECK FOR COLLISION
        if (
          (r1 >= x2 && b1 >= y2 && y1 < y2 && x1 < r2) || // top left
          (x1 <= r2 && b1 >= y2 && y1 < y2 && r1 > r2) || // top right
          (r1 >= x2 && y1 <= b2 && b1 > b2 && x1 < x2) || // bottom left
          (x1 <= r2 && y1 <= b2 && b1 > b2 && r1 > r2) || // bottom right
          (y1 == y2 && r1 == r2 && b1 == b2 && x1 == x2) || // all sides match
          (y1 >= y2 && x1 <= r2 && b1 <= b2 && r1 > r2) || // drag right of
          (y1 >= y2 && r1 >= x2 && b1 <= b2 && x1 < x2) || // drag left of
          (x1 >= x2 && r1 <= r2 && y1 <= b2 && b1 > b2) || // drag bottom of
          (x1 >= x2 && y1 >= y2 && b1 <= b2 && r1 <= r2) // inside of
        ) {
          sibInner.addClass("collision");
          return true;
        } else {
          sibInner.removeClass("collision");
          return false;
        }

        // if ( (y1 >= y2 && r1 >= x2 && b1 <= b2 && x1 < x2) ) {
        // 	console.log('true');
        // 	$sib.css('background','#ff7575');
        // } else {
        // 	$sib.css('background','#6ddba8');
        // 	$el.css('background','#6ddba8');
        // }
      }
    });
  }, []);
  console.log(props.src);
  return (
    <div
      className="wrapper"
      style={{ backgroundImage: props.src }}
      oncontextmenu="return false;"
    ></div>
  );
};
export default JquerySelectionBox;
