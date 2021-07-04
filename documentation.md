Documentation
------------------
This project contains all other setup like
```bash
https apis call,
mock api request/response setup
router
vuex store
web socket plugin
test cases
responsive scss
```
it won't require any setup level changes we just have to mention backend api path and start with staging mode
Let's see each of modules.

src
------
src module contains all of the source code

api
-------
if we need to have any backend api call we have mentioned define a method for that api 
and we can use that method inside action(vuex store)


api-mock
-------
this is to replicate a mock request/response for backend api call
when we run
```bash
npm run dev
```
it automatically start using this mock api.


assets
-------
it contains scss and images that we have to use in code.

components
----------
it contains all .vue components 


config
--------
this is place to define

	static text
	backend api path
	that we are going to use in project


directives
----------
we can define our directive over here that we can import in our project

```implemented a directive to close sidebar on the click anywhere outside of sidebar```


mixins
--------
this is to define mixins 


pages
------
it contains all of the landing pages for now we have only 1.
ListPage (on route /stock) to display stock info
So we can this to define all different pages for different route path


router
--------
for configuring all the route and corresponding vue component to render.


store & plugins
---------------
this is place to define store modules and plugins to attatch them with vuex

i have stockSocket plugin and attached it to store to get all the event for 'onmessage' and get called veux action

	benifits
		components are lossely coupled
		easy to test compoent and socket separately
		and we can add a new or remove any web sockets without touching components (SOLID principle)


utils
--------
to define all utilites that we need across different component.
to have some logic that should not be part of component. 
example - 
	api call generic template
	param serialization for api calls
	webSocket creations 
		that we can import in component (where we need) or import inside store plugin and attach that to vuex


main.js  & App.vue
----------------------
Start of the project. vue app creation



test/unit
-----------
where all the test cases are there.


test/coverage
--------------
contains coverage related information

we can open 
	/tests/coverage/lcov-report/index.html
	file in browser to see coverage

also we can use sonarqueue to see the code coverage

Steps to see the code coverage
-------------------------------
	1. download sonarQube (https://www.sonarqube.org/downloads/)
	2. run sonarqube in local system
		cd {directory where sonar in installed}
		./sonar.sh console
	example - 
	./Downloads/sonarqube-6.7.7/bin/macosx-universal-64/sonar.sh console

	then we can run below command
	npm run test:sonar-local

	open below link to see coverage 
		http://localhost:9000/dashboard?id=stock-ui



.env
----------
```bash 
.env.{mode}
```
mode - development, production, staging

to configure some property based on environment


vue.config.js
------------
to override or configure vuejs webpack configuration


build
----------

contains dockerization and release build related code.

	config.js
	----------
	to proxy backend api to connect with ui if needed

	index.js
	--------
	to run build code.
	if we wanted to check how our build works we can use this to run code in local to see.
	npm run build - (it will create build)
	npm run preview - (it will run build code in local server)

	packager.js
	------------
	create snapshot or release build code



How App is working
--------------------
1. sidebar
   ---------
    select and unselect subscribers

	search box to filter subscribers
	
    we can click anywhere outside of sidebar model to close sidebar

2. In header section 
   ----------------
    search box to add new ISIN number
	
    filter icon to open sidebar

3. list section to show ISIN details
