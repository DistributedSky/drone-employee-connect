REST API
-------------

### `/api/v1/containers`

#### GET

Get list of active containers

##### Response

```json
{
    "containers": [
        "2f44230ab5"
    ]
}
```

### `/api/v1/containers/<short_id>`

#### GET

Take container status by interface identifier

##### Response

```json
{
    "containers": {
        "2f44230ab5": {
            "status": "running"
        }
    }
}
```

##### POST

Run container for given interface

##### Request

* `image` - Docker image name
* `params` - JSON list of key/value image params

##### Response

```json
{
    "containers": {
        "2f44230ab5": {
            "status": "running"
        }
    }
}
```
### `/api/v1/containers/<short_id>/logs`

#### GET

Take container full logs

##### Response

```json
{
    "containers": {
        "81227f9dea": {
            "logs": "b'\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# \\r\\x1b[K\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# \\r\\n\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# assd\\r\\nbash: assd: command not found\\r\\n'"
        }
    }
}
```

### `/api/v1/hardware`

#### GET

Take hardware information

##### Response

```json
{
    "hardware": {
        "arch": "x86_64",
        "internet": true,
        "system": "Linux",
        "time": 1489482800.5335846,
        "usage": {
            "cpu": [
                3.0,
                3.0,
                7.1,
                5.0
            ],
            "mem": 35.0
        },
        "wlans": [
            "wlan0"
        ]
    }
}
```
