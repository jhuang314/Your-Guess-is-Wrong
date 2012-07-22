(($)->

	$(this).tooltips()

	round = (number, digits)->
		multiple = Math.pow(10, digits)
		roundedNum = Math.round(number*multiple)/multiple

	getCorrectness = (price, guess)->
		bigger = Math.abs(Math.max(price, guess))
		smaller = Math.abs(Math.min(price, guess))
		difference = bigger - smaller
		correctness = difference/bigger*100
		if correctness < 0 or correctness > 100
			correctness = 0

		round(100 - correctness, 2)

	Listing = Backbone.Model.extend
		url: '/fetch.php'
	
	ListingView = Backbone.View.extend
		el: '#images',

		initialize: ()->
			@model.bind('change', @render, this)
			this
		,

		render: ()->
			template = _.template( $('#images-template').html() )
			@$el.fadeOut ()=>
				@$el.html( template(@model.toJSON()) ).fadeIn()
			$('input[disabled]').removeAttr('disabled')
			this
		,

	Score = Backbone.Model.extend()

	Scores = Backbone.Collection.extend
		model: Score

	ScoreView = Backbone.View.extend
		el: '#scores',
		
		initialize: ()->
			@collection.bind('add', @render, this)
			this
		,

		render: ()->
			template = _.template( $('#scores-template').html() )
			@$el.html( template(scoreCollection: @collection.toJSON()) )
			this
		,

	listing = new Listing()
	scores = new Scores()
	scoreView = new ScoreView(collection: scores)
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
		$('input').attr('disabled', 'disabled')
		listing.fetch()

	proceed = ()->
		$('input').attr('disabled', 'disabled')
		newScore = new Score
			title: listing.get('title'),
			url: listing.get('url'),
			correctness: getCorrectness(listing.get('price'), $price.val()),
			price: listing.get('price'),
			guess: $price.val(),

		scores.add(newScore)
		listing.fetch()

	$price = $('#price')
	$('#done-button').on 'click', ()->
		proceed.call(this)

	$price.on 'keypress', (e)->
		if e.which is 13
			proceed.call(this)

)(jQuery)
