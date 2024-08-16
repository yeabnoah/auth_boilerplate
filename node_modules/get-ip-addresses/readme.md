# get-ip-addresses
Returns array of IPV4 Address for this machine.

## Install
~~~shell
npm i get-ip-addresses -S
~~~

## Use
### ES6
~~~es6
import getIpAddresses from 'get-ip-addresses';
console.log(getIpAddresses());
~~~

### Ye Olde
~~~javascript
var getIpAddresses = require('get-ip-addresses').getIpAddresses;
console.log(getIpAddresses());
~~~

### Refresh IP Addresses
By default, the list of IP addresses is cached. To force a refresh, you can pass an additional parameter.
~~~es6
getIpAddresses(true);
~~~

## Kudos
Liberated from this StackOverflow answer: http://stackoverflow.com/a/8440736

Ryan Boucher