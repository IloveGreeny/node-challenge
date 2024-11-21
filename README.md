### Backend Challenge 

  Made the connection with the database with Docker Desktop.Tested the api endpoints with Postman..So the first step is to download Docker Desktop if you haven't already. Next Dowload Postman or use alternatives. Change the enviroment variables to your needs in .env. The default `POSTGRES_USER is postgres`.
So basically run this docker command 
`{docker run -e POSTGRES_PASSWORD=`{yourpostgrespassword}` -e POSTGRES_DB=`{db_name}` -p 5432:5432 --name=backend-pg -d postgres}.`
Then run the image if the download has completed you should see your container running with the name backend-pg,now you can connect the PostGreSql with the Application.

 
## API Endpoints

#### Product Routes
##### Get Product by Name

```http
  GET http://localhost:3000/api/product/plu/:plu/name/:plu
```

#### Get Product by Plu

```http
  GET http://localhost:3000/api/product/plu/:plu
```

### Create Product

```http
  POST http://localhost:3000/api/product
```

### Example Body Raw(Json)

```
{
    "plu" : "1213",
    "name" : "apple"
}
```
If everything was done correctly,it should 200 Http Code and a message
#### 

### Remainder Routes
#### Get Remainder by Plu
```http
  GET http://localhost:3000/api/remainder/plu/:plu
```
#### Get Remainder by ShopID
```http
  GET http://localhost:3000/api/remainder/shopId/:shop_id
```
#### Get Remainder by Shelf Storage
```http
  GET http://localhost:3000/api/remainder/shopId/:shop_id/shelfStorage/:shelf
```
#### Get Remainder by Order Storage
```http
  GET http://localhost:3000/api/remainder/shopId/:shop_id/orderStorage/:order
```
### Create Remainder

```http
  POST http://localhost:3000/api/remainder
```

### Example Body Raw(Json)

```
{
    "plu" : "1123",
    "order" : 4,
    "shelf" : 13
}
```
If everything was done correctly,it should 200 Http Code and a message.

### Increase Remainder

```http
  PATCH http://localhost:3000/api/remainder/remainderIncrease/shopId/:shop_id/plu/:plu
```

### Example Body Raw(Json)

```
{
    "order" : 43,
    "shelf" : 21
}

```
If everything was done correctly,it should 200 Http Code and a message.

### Decrease Remainder

```http
  PATCH http://localhost:3000/api/remainder/remainderDecrease/shopId/:shop_id/plu/:plu
```

### Example Body Raw(Json)

```
{
    "order" : 4,
    "shelf" : 3,
}
```
If everything was done correctly,it should 200 Http Code and a message.

### Event Routes
#### Get Event by ShopID
```http
  GET http://localhost:3000/api/events/shopId/1?page=1&limit=5 (default page=1, limit=10)
```
#### Get Event by Plu
```http
  GET http://localhost:3000/api/events/plu/1213?page=1&limit=5
```
#### Get Event by Date
```http
  GET http://localhost:3000/api/events/date/2024-11-21?page=1&limit=5
```
#### Get Event by Action(Method)
```http
  GET http://localhost:3000/api/events/action/GET?page=1&limit=5
```
