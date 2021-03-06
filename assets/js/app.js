// Generated by CoffeeScript 1.3.3
(function() {

  (function($) {
    var $price, Listing, ListingView, Score, ScoreView, Scores, getCorrectness, listing, proceed, round, scoreView, scores, view,
      _this = this;
    $(this).tooltips();
    round = function(number, digits) {
      var multiple, roundedNum;
      multiple = Math.pow(10, digits);
      return roundedNum = Math.round(number * multiple) / multiple;
    };
    getCorrectness = function(price, guess) {
      var bigger, correctness, difference, smaller;
      bigger = Math.abs(Math.max(price, guess));
      smaller = Math.abs(Math.min(price, guess));
      difference = bigger - smaller;
      correctness = difference / bigger * 100;
      if (correctness < 0 || correctness > 100) {
        correctness = 0;
      }
      return round(100 - correctness, 2);
    };
    Listing = Backbone.Model.extend({
      url: '/fetch.php'
    });
    ListingView = Backbone.View.extend({
      el: '#images',
      initialize: function() {
        this.model.bind('change', this.render, this);
        return this;
      },
      render: function() {
        var template,
          _this = this;
        template = _.template($('#images-template').html());
        this.$el.fadeOut(function() {
          return _this.$el.html(template(_this.model.toJSON())).fadeIn();
        });
        $('input[disabled]').removeAttr('disabled');
        return this;
      }
    });
    Score = Backbone.Model.extend();
    Scores = Backbone.Collection.extend({
      model: Score
    });
    ScoreView = Backbone.View.extend({
      el: '#scores',
      initialize: function() {
        this.collection.bind('add', this.render, this);
        return this;
      },
      render: function() {
        var template;
        template = _.template($('#scores-template').html());
        this.$el.html(template({
          scoreCollection: this.collection.toJSON()
        }));
        return this;
      }
    });
    listing = new Listing();
    scores = new Scores();
    scoreView = new ScoreView({
      collection: scores
    });
    view = new ListingView({
      model: listing
    });
    listing.fetch();
    $('body').on('click', 'a[href="#"]', function(e) {
      return e.preventDefault();
    });
    $('#images').on('click', '.thumb', function(e) {
      var bigSrc, littleSrc;
      bigSrc = _this.$('.big-thumb').attr('src');
      littleSrc = $(e.target).attr('src');
      _this.$('.big-thumb').stop().fadeOut('fast', function() {
        return $(this).attr('src', littleSrc).stop().fadeIn('fast');
      });
      return $(e.target).attr('src', bigSrc);
    });
    $('#skip-button').on('click', function() {
      $('input').attr('disabled', 'disabled');
      return listing.fetch();
    });
    proceed = function() {
      var newScore;
      $('input').attr('disabled', 'disabled');
      newScore = new Score({
        title: listing.get('title'),
        url: listing.get('url'),
        correctness: getCorrectness(listing.get('price'), $price.val()),
        price: listing.get('price'),
        guess: $price.val()
      });
      scores.add(newScore);
      return listing.fetch();
    };
    $price = $('#price');
    $('#done-button').on('click', function() {
      return proceed.call(this);
    });
    return $price.on('keypress', function(e) {
      if (e.which === 13) {
        return proceed.call(this);
      }
    });
  })(jQuery);

}).call(this);
