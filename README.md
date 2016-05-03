#jquery.occasions

jquery.occasions is a [jQuery](http://www.jquery.com/) plugin that tags an element with a class reflecting the current day's occasion or holiday. You can then style that element with CSS (or do something else clever with it). For example, you could show special versions of your site's logo on different holidays.

Minified version size: ~2kb

##Installation

Include `jquery.occasions.js` (or `jquery.occasions.min.js`) and `occasions.json` in your project.

##Basic usage

Call jquery.occasions on the element you want tagged with special occasions:

```
$('#logo').occasions();
```

On May the 4th, this will result in:

```
<h1 id="logo" class="star-wars"><a href="/">Logo</a></h1>
```

In your CSS, define the styles of the occasions that you wish to make use of. You are provided with supported style stubs in `jquery.occasions.css`. You may ignore the occasions that you do not want to use but their class names will still be added to your element.

##Options

###country

This will give you additional occasions specific to the provided country. 'Canada' and 'USA' are provided. Pals.

```
$('#logo').occasions({country:'canada'}); //requires canada.json
```

###path

jquery.occasions will look for its required external files in the same directory from which it is run. If you wish to store these somewhere else, you'll need to provide the filepath.

```
$('#logo').occasions({path:'../my/file/path'});
```

###sect

This will give you additional occasions specific to the provided religious sect. 'Christian' and 'Pasta' are provided.

```
$('#logo').occasions({sect:'pasta'}); //requires pasta.json
```

###onSuccess callback

When jquery.occasions adds a class to your element, code inside the `onSuccess` callback will be executed.

```
$('#logo').occasions({
  onSuccess: function() {
    //add your callback code here
  }
});
```

##Testing

###Date override

You can simulate an occasion by passing in the date you wish to test:

```
$('#logo').occasions({date_override:'05/04'});
```

###Current occasion

You can retrieve the current occasion that is attached to your element with:

```
$('#logo').occasion
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

### Version 1.0.0: Skoki

* Add Jasmine test suite
* Add date date_override
* Use leading zeroes in all dates
* Set occasion property on element

### Version 2.0.0: Heart Mountain

* Total rewrite with expanded test suite
* Support multiple occasions per day
* Support custom occasions
* Move occasions to external files (loaded only as needed)
* Expand default occasions

##Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
