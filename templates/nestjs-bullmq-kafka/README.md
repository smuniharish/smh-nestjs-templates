 ## For Generating Module
 nest g module controllers

 For Generating Controller
nest g controller users controllers --flat --no-spec

For Generating Service
nest g service users services --flat --no-spec

For Generating Migration
npm run typeorm:generate-migration --name=CreatePost

npm run migrate:create -- -n MyMigrationName
