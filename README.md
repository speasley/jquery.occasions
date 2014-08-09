#jquery.occasions

jquery.occasions is a [jQuery](http://www.jquery.com/) plugin that tags an element with a class referencing the current day's occasion or holiday. You can then style that element with CSS (or do something else clever with it). For example, you could show special versions of your site's logo on different holidays.

Minified version size: ~2kb

##Basic usage

Call jquery.occasions on the element that you want to tag with special occasions:

```
$('.logo').occasions();
```


On May the 4th, this will result in:

```
<h1><a class="star-wars" href="/">Logo</a></h1>
```


In your CSS, define the styles of the occasions that you wish to make use of. You are provided with supported style stubs in `jquery.occasions.css`. You may ignore the occasions that you do not want to use but their class name will still be added to your element.

###Options

####Country

```
$('.logo').occasions({country:'Canada'});
```

####Sect

```
$('.logo').occasions({sect:'Christian'});
```

####Callback

```
$('.logo').occasions({
	onSuccess: function() {
		//add your callback code here
  }
});
```

## Change Log

### Version 0.0.1: Tunnel Mountain

* Basic functionality
* Some unofficial holidays
* Canadian fixed-date national holidays and observances
* Christian fixed-date holidays and observances

### Version 0.0.2: Yoho

* Country setting bugfix
* Support for nth weekday occasions (eg. Mother's Day, Second Sunday of May)
* Support for the weekday preceding a date (eg. Victoria Day, Monday before May 25)
* Add Canadian and Christian nth weekday occasions
* Remove Christian Easter occasions because they are based on moon cycles and beyond the scope of my interest in writing this plugin

### Version 0.1.1: Bow River

* Add callback function

##Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
