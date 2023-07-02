#!/bin/bash

# Execute command on configsvr01 container
docker-compose exec configsvr01 sh -c "mongosh < /scripts/init-configserver.js"
sleep 3  # Sleep for 5 seconds

# Execute command on shard01-a container
docker-compose exec shard01-a sh -c "mongosh < /scripts/init-shard01.js"
sleep 3  # Sleep for 5 seconds

# Execute command on shard02-a container
docker-compose exec shard02-a sh -c "mongosh < /scripts/init-shard02.js"
sleep 3  # Sleep for 5 seconds

# Execute command on shard03-a container
docker-compose exec shard03-a sh -c "mongosh < /scripts/init-shard03.js"
sleep 3  # Sleep for 5 seconds

# Execute command on router01 container
docker-compose exec router01 sh -c "mongosh < /scripts/init-router.js"
sleep 3  # Sleep for 5 seconds

# Connect to router01 container and execute additional commands
docker-compose exec router01 mongo --port 27017 --eval "
sleep(10000);  // Sleep for 10 seconds
db = db.getSiblingDB('admin');
db.runCommand({ enableSharding: 'timeseries' });
sleep(10000);  // Sleep for 10 seconds
db.adminCommand({ shardCollection: 'timeseries.timeseries', key: { timestamp: 1, sensorId: 1 } });
"
