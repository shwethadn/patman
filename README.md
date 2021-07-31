# PatMan

A Patient Manager Application that grants access to patients medical records for a given Hospital/Doctor which assists in better care and treatment for the present medical condition.

## Developed Using

- OSX
- Rails v6.0.x
- Ruby v2.6.x

## Installation Guide

- Clone the repo
```
git clone git@github.com:mansoorkhan108/patman.git
```
- Switch to Ruby v2.6.3
```
rvm use ruby-2.6.3
```
- bundle
```
bundle install
```
- Install Postgresql
```
brew install postgresql
```
- Install Redis
```
brew install redis
```
- Install Tesseract
```
brew install tesseract
```
- Create Database
```
rails db:create
```
- Run Migrations to create tables
```
rails db:migrate
```
- Start Rails Server
```
rails s
```
- Start resque workers for background processing of Tesseract-OCR on image files
```
QUEUE=data_parsing_queue COUNT=2 rake resque:workers
```
