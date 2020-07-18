.PHONY: ops stop janus client server site heidi livestream

ops:
	docker-compose up -d

stop:
	docker-compose down

janus: 
	docker-compose up -d janus

client:
	docker-compose up -d client

server:
	docker-compose up -d server

site:
	docker-compose up -d server client

heidi:
	docker-compose up -d heidi

livestream:
	docker-compose up -d heidi client server janus
