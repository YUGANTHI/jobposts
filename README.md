# Job-Post
Job Posts Sync and search using GIT API

### Prerequisites
```
Angular CLI: v9.0.0
Node: v12.16.1
```

**Note** that this seed project requires **node >=v8.9.0 and npm >=5.5.1**.


## Angular App.

### Change Necessary Configurations (First time only)
In The /jobsearch/app/environments folder change file environment.ts with the ip address to your local ipaddress. 

## To run project for the first time
```
Step 1: Complete installation procedures   
Step 2: Go to the path /jobsearch
Step 3: npm install.
Step 4: Run ng serve --host=your-ip-address.
step 5: Map your-ip-address of the angular app in the server.js CORS
``` 

## Installation for node App.

#### Install Nodemon
```
npm install nodemon -g
npm install -g sequelize-cli
```

### Change Necessary Configurations (First time only)
In The /jobsearch/app/environments folder change file environment.ts with the ip address to your local ipaddress. 

## To run project for the first time
```
Step 1: Complete installation procedures   
Step 2: npm install.
Step 3: sequelize db:migrate.
Step 4: sequelize db:seed:all.
Step 5: Run nodemon server.js.
``` 
```
The Node app runs on the post 'http://localhost:3000'
The Angular App runs on the post 'http://your-ip-address:3000'
```

## Author
Yuganthi
