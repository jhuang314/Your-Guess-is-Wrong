<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Your Guess is Wrong</title>
		<link rel="stylesheet" type="text/css" href="assets/css/foundation.css" />
		<link rel="stylesheet" type="text/css" href="assets/css/styles.css" />
	</head>
	<body>
		<script type="text/template" id="images-template">
			<div class="three columns">
				<% for (var i = 1; i < images.length; i++) { %>
					<div class="row">
						<div class="twelve columns">
							<a href="#">
								<img src="<%= images[i] %>" alt="" class="thumb" />
							</a>
						</div>
					</div>
				<% } %>
			</div>
			<div class="<%= images.length > 1 ? 'nine' : 'twelve' %> columns">
				<img src="<%= images[0] %>" alt="" class="big-thumb" />
			</div>
		</script>
		<div class="row">
			<header>
				<h1>Your Guess is Wrong</h1>
			</header>
		</div>
		<div class="row">
			<div class="twelve columns">
				<div class="row">
					<div class="twelve columns">
						<input type="text" name="title" id="title" placeholder="Title" />
					</div>
				</div>
				<div class="row">
					<div class="nine columns" id="images">
						<img src="http://dummyimage.com/750x400" alt="" />
					</div>
					<div class="three columns">
						<div class="row collapse">
							<div class="two columns">
								<span class="prefix">$</span>
							</div>
							<div class="ten columns">
								<input type="text" name="price" id="price" placeholder="Price" />
							</div>
						</div>
						<div class="row">
							<div class="twelve columns">
								<input type="button" name="done_button" class="success button round large" id="done-button" value="Done" />
							</div>
						</div>
						<div class="row">
							<div class="twelve columns">
								<input type="button" name="skip_button" class="alert button round large" id="skip-button" value="Skip" />
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="twelve columns">
					</div>
				</div>
			</div>
		</div>

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script src="assets/js/underscore.js"></script>
		<script src="assets/js/backbone.js"></script>
		<script src="assets/js/app.js"></script>
	</body>
</html>
