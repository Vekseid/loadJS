loadJS
======

A simple sequential javascript loader. RequireJS was a bit excessive for most of my needs and most others did things that were either extraneous or not enough. It's also smaller than most, about a kilobyte minified.

Tested in IE 6+, Firefox 2+, Opera 8+, Safari 5+, Chrome

Usage
=====

loadJS(Array|string, string);

The first parameter takes either an array of pathnames or urls (without the .js extension) or a single path/url. The second parameter is an optional pathname for files to be loaded from.

Full urls (those beginning with http://, https://, or //) will ignore the prefix.
