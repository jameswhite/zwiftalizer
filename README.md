# Zwiftalizer

Zwift log file analyzer - a web browser based drag and drop tool for reading Zwift log files

![screenshot](https://github.com/mhanney/zwiftlog/blob/master/screenshots/zwiftlog-v.0.3.0.png)

## What is this?

This is a browser based tool to analyze the log file from the Zwift cycling
platform and output graphics frames per second and ANT+ signal performance charts.
The code runs 100% client side with no back-end component.
Log files are not uploaded anywhere and no data is transferred off the end user's computer.

## 0.4.0 Changes (TBA)

# Tabbed sections for ANT+, Network and Graphics (React tabs)
# ANT+ Device signals  
# ANT+ Device to channel mapped correctly
# ANT+ Power source identification (experimental)
# ANT+ Device manufacturer and model identification (experimental)
# ANT+ Powermeter reading line chart for crank and wheel based meters (including Kickr, not including Power2Max)
# ANT+ Powermeter calibration (current zero offset value) displayed (not including Power2Max)
# ANT+ Powermeter calibration auto-zero support displayed (true/false)
# ANT+ reconnects now shows max value per 10s rollup (to exaggerate bars)
# ANT+ reconnects chart zoom (mouse wheel)
# ANT+ reconnects chart pan (click and drag brushing)
# ANT+ Wahoo Kickr gradient changes line chart
# ANT+ FE-C gradient changes line chart (Tested with Tacx)
# ANT+ Basic device (4Hz) and Advanced device (8Hz) sample rates identified (experimental)
# Network reconnect attempts chart
# Network phone connection attempts chart
# Network errors chart
# Graphics OpenGL version and driver information
# Graphics shadow resolution added
# Graphics line chart zoom (mouse wheel)
# Graphics line chart pan (click and drag brush area)
# Graphics line chart tracker (vertical bar)
# Graphics line chart Min, Max, Avg for zoomed area
# Graphics line chart using 15s avg rollups
# Redux for managing state
# Replaced Dropzone.js with React Dropzone
# Parser function library for improved testing with fewer side effects
# More unit tests (Tape)
# Activity Date Time changed from ANSI to more Humanly readable format
# Styles overhaul (CSS modules)
# Removed bogus 'help' modal windows


## 0.3.1 Changes (2016-04-05)

* Can now parse logs shorter than 3 minutes again
* Logs longer than 3 minutes skip the first 3 minutes of FPS data
* Logs shorter than 3 minutes include all FPS data
* Removed dependency on jQuery
* Removed dependency on Bootstrap JavaScript
* Replaced jQuery ajax with qwest (for the demo)
* Replaced Bootstrap.js with bootstrap.native


## 0.3.0 Additions (2016-02-26)

* ANT+ Power Meter message count per second
* ANT+ Smart Trainer message count per second
* ANT+ message failure count per device per second
* ANT+ reconnects count (global, per second)
* FPS chart points reduced to 3 sec averages
* Pan Zoom with mouse wheel
* Demo mode
* [ESnet's React Timeseries Charts](https://github.com/esnet/react-timeseries-charts), Copyright of The Regents of the University of California, through Lawrence Berkeley National Laboratory.
* Unit tests in Tape.js
* Help screens


## 0.2.0 Additions (2016-01-25)

* Graphics Profile
* Graphics Resolution
* Platform (PC or Mac)
* CPU Vendor
* GPU Vendor
* Basic System Info
* Log Date, Time and Duration
* Faster parsing
* Unit tests

## What's it written in?

This application is written entirely in ES6 JavaScript and uses ReactJS,
React Dropzone, Twitter Bootstrap and ESnet's React Timeseries Charts.
The run-time javascript is built using nodejs, babel and webpack.

## Why?

I created this because there isn't a cross platform, easy to use, zero
dependency log reader for end users. I use several machines for Zwift and wanted
an easy way to see how each one performs without installing anything.

## What is Zwift?

Zwift is a "massively multiplayer online game" where cyclists compete against
one another in virtual, three-dimensional worlds. To participate, riders need a
bike, a stationary trainer, and basic wireless sensors that measure speed and
cadence. For more accurate data, Zwift's gamers use a power meter or smart
trainer that measures the actual force cyclists apply to the pedals. Riders also
need a computer and a n ANT+ dongle.

## How do I use it?

Go to [http://zwiftalizer.com/](http://zwiftalizer.com/) and drop your file onto the dotted box.

## How can I contribute?

Clone this repository then do the following:

Assuming node and npm are installed and in your path, cd to the cloned directory
and run the following commands to install the node dependencies needed to build
the source.

```
npm install --no-optional
```

For development, run webpack from the npm script labeled `dev` (defined in
package.json)

```
npm run dev
```

To make a release build, run the npm script labeled `release` (defined in
package.json)

```
npm run release

```

To run the tests

```
npm run test

```

## Acknowledgements and References

* [ReactJS](https://facebook.github.io/react/) &mdash; a JavaScript library for building user interfaces (Facebook Inc)

* [react-timeseries-charts](https://github.com/esnet/react-timeseries-charts) Declarative and modular timeseries charting components for React

* [pond](https://github.com/esnet/pond) Immutable timeseries data structures used within ESnet tools

* [d3](http://d3js.org/) &mdash;a JavaScript library for manipulating documents based on data

* [Bootstrap](https://github.com/twbs/bootstrap) &mdash; Modern UI components and interactions

* [nodejs](https://github.com/joyent/node) &mdash; evented I/O for v8 javascript

* [Tape](https://github.com/substack/tape) &mdash; tap-producing test harness for node and browsers

* [webpack](https://webpack.github.io/) &mdash; Webpack is a module bundler for JavaScript. Webpack takes modules with dependencies and generates static assets representing those modules.

* [Zwift](http://zwift.com/) &mdash; GLOBAL. CYCLING. COMMUNITY.

##Licenses

### Zwiftalizer

The MIT License (MIT)

Copyright (c) 2016 Michael Hanney

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### ESnet React Timeseries Charts License

"ESnet React Timeseries Charts, Copyright (c) 2015, The Regents of the
University of California, through Lawrence Berkeley National Laboratory (subject
to receipt of any required approvals from the U.S. Dept. of Energy). All rights
reserved."

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

(1) Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

(2) Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation and/
or other materials provided with the distribution.

(3) Neither the name of the University of California, Lawrence Berkeley National
Laboratory, U.S. Dept. of Energy nor the names of its contributors may be used
to endorse or promote products derived from this software without specific prior
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

You are under no obligation whatsoever to provide any bug fixes, patches, or
upgrades to the features, functionality or performance of the source code
("Enhancements") to anyone; however, if you choose to make your Enhancements
available either publicly, or directly to Lawrence Berkeley National Laboratory,
without imposing a separate written license agreement for such Enhancements,
then you hereby grant the following license: a  non-exclusive, royalty-free
perpetual license to install, use, modify, prepare derivative works, incorporate
into other computer software, distribute, and sublicense such enhancements or
derivative works thereof, in binary and source code form.

### ESnet Pond License

ESnet Timeseries Library (Pond), Copyright (c) 2015, The Regents of the
University of California, through Lawrence Berkeley National Laboratory (subject
to receipt of any required approvals from the U.S. Dept. of Energy).  All rights
reserved."

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

(1) Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

(2) Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.

(3) Neither the name of the University of California, Lawrence Berkeley National
Laboratory, U.S. Dept. of Energy nor the names of its contributors may be used
to endorse or promote products derived from this software without specific prior
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

You are under no obligation whatsoever to provide any bug fixes, patches, or
upgrades to the features, functionality or performance of the source code
("Enhancements") to anyone; however, if you choose to make your Enhancements
available either publicly, or directly to Lawrence Berkeley National Laboratory,
without imposing a separate written license agreement for such Enhancements,
then you hereby grant the following license: a  non-exclusive, royalty-free
perpetual license to install, use, modify, prepare derivative works, incorporate
into other computer software, distribute, and sublicense such enhancements or
derivative works thereof, in binary and source code form.
