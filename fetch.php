<?php

require_once('config.php');

function curl_json($url) {
	// Create
	$curl = curl_init();

	// Config
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	// Curl
	$data = curl_exec($curl);

	// Close
	curl_close($curl);

	// JSON
	return json_decode($data);
}

function api_call($url) {
	return curl_json($url . '&api_key=' . ETSY_API_KEY);
}

function get_active_listings($page = 1) {
	$url = sprintf(ETSY_ACTIVE_LISTINGS_URL, $page);
	return api_call($url);
}

function get_listing_images($listing_id) {
	$url = sprintf(ETSY_LISTING_IMAGES_URL, $listing_id);
	return api_call($url);
}

function get_random_listing() {
	do {
		// Get a bunch of random listings
		$page = rand(1, 15);
		$listings = get_active_listings($page);

		// Random select
		shuffle($listings->results);
		$listing = $listings->results[0];

		// Get images
		$images = get_listing_images($listing->listing_id);
	} while (count($images->results) == 0);

	// Get image URLs
	$image_urls = array();
	foreach ($images->results as $image) {
		$image_urls []= $image->url_fullxfull;
	}

	$random_listing = array(
		'title' => $listing->title,
		'price' => $listing->price,
		'url' => $listing->url,
		'images' => $image_urls,
	);

	return json_encode($random_listing);
}

echo get_random_listing();
