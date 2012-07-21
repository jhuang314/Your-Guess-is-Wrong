// Generated by CoffeeScript 1.3.3
(function() {

  (function($) {
    var Listing, ListingView, listing, view,
      _this = this;
    Listing = Backbone.Model.extend({
      url: '/fetch.php'
    });
    ListingView = Backbone.View.extend({
      el: '#images',
      initialize: function() {
        this.model.bind('change', this.render, this);
        this.render();
        return this;
      },
      render: function() {
        var template;
        template = _.template($('#images-template').html());
        this.$el.html(template(this.model.toJSON()));
        return this;
      }
    });
    listing = new Listing();
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
    return $('#skip-button').on('click', function() {
      return listing.fetch();
    });
  })(jQuery);

}).call(this);
