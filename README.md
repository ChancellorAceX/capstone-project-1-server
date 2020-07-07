# BattleSource

### Summary
This is an api server that is intended to be used only with it's partner application. That being said, it is possible for others to use it as well.

### Technology
THis server api has a partner client with a react router framework. The server side uses a postgresql/express database framework to support requests and responses.

### Live Client
https://battlesource.vercel.app/


# API documentation
## Reference
Base URL: https://blooming-sierra-59112.herokuapp.com

Client Libraries: Node.js, Express, PostgreSQL

## Authentication
This API keys to authenticate requests. The authentication process is based on a jwt system, and is required for most actions involving campaign, encounter, or character manipulation.

### Open routes:
GET '/api/bestiary' 
  - returns: an array of objects all beasts

GET '/api/bestiary/:bid' 
  - returns: an object containing detailed information for a specific monster

POST '/api/login'
  - body: {username,password}
  - returns: {authToken: jwtAuthToken}

POST '/api/user'
  - body:{fullname, nickname, username, password}
  - returns: the newly created user without the password

### Authenticated Routes:
GET '/api/encounter'
  - returns: an array of objects container all of that user's encounter data

POST '/api/encounter'
  - body: {encountername,encounterdesc,encountercampaignid}
  - returns: an object containing the newly created encounter

GET '/api/encounter/:eid'
  - returns: an array containing the encounter's details

DELETE '/api/encounter/:eid'
  - returns: the message 'Encounter Deleted' upon a successful deletion

GET '/api/campaign'
  - returns: all campaigns and associated data

POST '/api/campaign'
  - body: {title}
  - returns: the newly created campaign's information

DELETE '/api/campaign/:cid'
  - returns: 'Campaign Deleted' on a successful deletion

POST '/api/character'
  - npc body: {'npc', 'pcname', 'initiative', 'ac', 'hp', 'hpmax', 'pcencounterid', 'pcbestiaryid'}
  - pc body: {'npc', 'pcclass', 'level', 'pcname', 'ac', 'hp', 'hpmax', 'pccampaignid'}
  - returns: newly created character information

DELETE '/api/character/:pcid'
  - returns: 'Character Deleted' on a successful deletion

PATCH '/api/characer/:pcid'
  - body: {updateObject:{desired updates}}
  - returns: object of updated character data