(($)->

	Listing = Backbone.Model.extend
		url: '/fetch.php'
	
	ListingView = Backbone.View.extend
		el: '#images',

		initialize: ()->
			@model.bind('change', @render, this)
			@render()
			this
		,

		render: ()->
			template = _.template( $('#images-template').html() )
			@$el.html( template(@model.toJSON()) )
			this
		,

	listing = new Listing()
	view = new ListingView(model: listing)
	listing.fetch()

	$('body').on 'click', 'a[href="#"]', (e)->
		e.preventDefault()
	
	$('#images').on 'click', '.thumb', (e)=>
		bigSrc = @$('.big-thumb').attr('src')
		littleSrc = $(e.target).attr('src')
		@$('.big-thumb').stop().fadeOut 'fast', ()->
			$(this).attr('src', littleSrc).stop().fadeIn('fast')
		$(e.target).attr('src', bigSrc)
	
	$('#skip-button').on 'click', ()->
		listing.fetch()


)(jQuery)
