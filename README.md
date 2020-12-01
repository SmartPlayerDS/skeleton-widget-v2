# Introduction
The skeleton project for create widget and run it in Digital Signage SmartPlayer platform.
Widget is HTML5 web technology application. Widget can show on device works with operation system:
 * Windows OS (starts Windows 7 x64(x32) and highest) 
 * Linux OS (start Ubuntu 18.04.5 LTS x64(x32) and highest)
 * Tizen OS (start Tizen 2.3 and highest)
 * Orsay OS (start Orsay 2 and highest)
 * WebOs OS (start Webos 2 and highest)
 * Android OS (start Android 5.0 and highest) 
 
 The different devices has different Chromium version it depends on a physical device.
 Use source code like pattern for create a new widget. The source code uses REACT framework for create application.
# Developer environment
* OS: Ubuntu 18.04 and highest or Windows 7 and highest
* Node Version Manager (NVM, https://github.com/nvm-sh/nvm) v0.36.0
* Node JS (https://nodejs.org/en/) v14.4.0. Project tested compile node v14.4.0.
* Node Package Manager (NPM) 6.13.4 and highest    
* GIT (https://git-scm.com/) 2.29.0 and highest  
 ### Install NVP on Ubuntu 18.04
 1. Install NVP `$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.36.0/install.sh | bash`
 1.1 Reboot computer
 2. Check correct installed `$ nvm --version`, in output console must be "v0.36.0"
 ### Install NodeJS on Ubuntu 18.04
 1. Install NodeJS `$ nvm install v14.4.0`
 2. Check correct installed `$ node -v`, in output console have to show version
 3. Node JS include NPM check it, `$ npm -v`, in output console must be "6.13.4"  
 ### Install GIT on Ubuntu 18.04
 1. Add a repository with last stable version `$ sudo add-apt-repository ppa:git-core/ppa`
 2. Install git `$ sudo apt install git`
 3. Check correct installed `$ git --version`, in output console must be "v2.29.0"
# Build application
The section information how do widget application for SmartPlayer platform. Widget for SmartPlayer platform compile to *.zip archive. 
After compiled *.zip file, user can upload it in personal cabinet (cms) and run on target device.
<br>
0. Clone source code <br>
`$ git clone https://github.com/SmartPlayerDS/skeleton-widget-v2.git`
1. In folder skeleton-widget-v2 make command fon install dependent for project: <br>
`$ npm install` <br>
2. Compile empty skeleton widget <br>
`$ npm run build` <br>
In folder skeleton-widget-v2/build/skeleton-widget-v2_${version}.zip is widget. 




