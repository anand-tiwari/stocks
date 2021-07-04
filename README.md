# Stock-ui

It's for rendering stock, price and other for ISIN number

## Installation

Use the package.json file for stating local server

for installing dependency 
```bash
npm -i
```

for starting dev server
```bash
npm run dev
```
for running unit test
```bash
npm run unit
```

for running unit test with local sonar setup
you may have to start local sever can download from
```https://www.sonarqube.org/downloads/```
```bash
{directory where sonar in installed}./sonar.sh console

example - 
./Downloads/sonarqube-6.7.7/bin/macosx-universal-64/sonar.sh console

then we can run below command

npm run test:sonar-local
```

for create build for release deployment
```bash
npm run package-release
```

for create build for snapshot deployment
```bash
npm run package-snapshot
```


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


ISIN

http://www.stockcare.net/ISINNumber.asp