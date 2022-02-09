# Code B

* A forum for all coding discussions, where users can interact with each other and continue their education in programming.

## Introduction to the project

This is a a simple web project, built to showcase Julie Meng's programming capabilities. It uses React.js front-end and Ruby on Rails back-end. PostgreSQL is also used along with BCrypt for authentication. The application has been deployed onto Heroku and is available here: https://code--b.herokuapp.com/

## Installation

To run this application, you will need to install the following gems:
```
gem "rails", "~> 7.0.0"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "bcrypt", "~> 3.1.7"
gem 'active_model_serializers',
    '~> 0.10.12',
    git: 'https://github.com/jpawlyn/active_model_serializers.git',
    branch: '0-10-stable'
```

In addition to the above, please ensure you are using 'react-router-dom' v5, as v6 will not be supported. The following should be in the top most section of the client/package.json file:
```
"name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3000",
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.3"
  },
  "scripts": {
    "start": "PORT=4000 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```



* Please note, this project does not contain any seed files. 

After running:
```
bundle install
sudo service postgresql start
rails db:migrate
```
CD into the client directory and run:
```
npm install
```

To run this service on localhost the follow commands will need to be executed from the root directory:
```
rails s
npm start --prefix client/
```

## Roadmap

The following are some features and services I am hoping to add in the near future. 

* tags for discussions
* Clickable URL's within discussions and comments
* Ability to add Markup code to discussions and comments
* Footer with links to Julie's GitHub, LinkedIn and Personal Website
* Contact for for any requests or errors that occur
* An Algorithm page with a featured Algorithm of the day


### This project is created, maintained and owned by Julie Ann Meng.

 Feel free to visit her other projects here: https://github.com/JulieAnnMeng
