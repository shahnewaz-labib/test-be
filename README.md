# Test Backend Setup

### Endpoints

- [POST] /create

```bash
curl --request POST \
  --url http://localhost:3000/create \
  --header 'content-type: application/json' \
  --data '{
  "name": "name",
  "email": "email@email.com",
  "role": "role"
}'
```

- [GET] /read

```bash
curl --request GET \
  --url http://localhost:3000/read
```

- [PUT] /update/:id

```bash
curl --request PUT \
  --url http://localhost:3000/update/<USER_ID> \
  --header 'content-type: application/json' \
  --data '{
  "name": "newname",
  "email": "email@email.com",
  "role": "admin"
}'
```

- [DELETE] /delete/:id

```bash
curl --request DELETE \
  --url http://localhost:3000/delete/<USER_ID>
```

### Run workflow locally with **Act**

```bash
act --container-architecture linux/amd64
```
