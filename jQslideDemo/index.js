var cat = {
  imgLeft: 1,
  startIndex: 0,
  len: $('.order ul li').length,
  timer: undefined,
  init: function () {
    this.bindEvent();
    this.autoPlay();
  },
  bindEvent: function () {
    var self = this;
    $('.left-btn').add($('.right-btn')).add($('.order ul li')).on('click', function () {
      //判断单击了哪个按钮
      if ($(this).attr('class') == 'left-btn') {
        self.tool('left');
      } else if ($(this).attr('class') == 'right-btn') {
        self.tool('right');
      } else {
        self.tool('li');
      }
    })
  },
  movePic: function (startLeft, startTime, lastLeft, lastTime) {
    if (startLeft && lastLeft) {
      $('.img-box').animate({
        left: startLeft
      }, startTime, 'swing', function () {
        $('.img-box').animate({
          left: lastLeft
        }, lastTime, 'swing');
      });
    } else {
      $('.img-box').animate({
        left: startLeft
      }, startTime, 'swing');
    }
  },
  tool: function (str) {
    var self = this;
    if (str == 'left') {
      if (self.startIndex == 0) {
        self.movePic('-2100px', 0, '+=300px', 1000);
        self.startIndex = self.len - 1;
        self.changeActive(self.startIndex);
      } else {
        self.movePic('+=300px', 1000);
        self.startIndex--;
        self.changeActive(self.startIndex);
      }
    } else if (str == 'right') {
      if (self.startIndex == self.len - 1) {
        self.movePic('-=300px', 1000, '0px', 0);
        self.startIndex = 0;
        self.changeActive(self.startIndex);
      } else {
        self.movePic('-=300px', 1000);
        self.startIndex++;
        self.changeActive(self.startIndex);
      }
    } else if (str == 'li') {
      self.startIndex = $(this).index();
      self.imgLeft = self.startIndex * -300 + 'px';
      self.movePic(self.imgLeft, 1000);
      self.changeActive(self.startIndex);
    }
  },
  autoPlay: function () {
    var self = this;
    setInterval(self.timer);
    self.timer = setInterval(function () {
      self.tool('right');
    }, 3000);
  },
  changeActive: function (index) {
    $('.list-active li').removeClass('active').eq(index).addClass('active');
  }
}
cat.init();