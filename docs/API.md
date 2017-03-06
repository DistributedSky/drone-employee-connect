REST API
-------------

### `/api/v1/interfaces`

#### GET

Take a list of WLAN interfaces 

##### response

```json
{
    "interfaces": [
        "wlan0",
        "wlan1"
    ]
}
```

### `/api/v1/interfaces/<iface_id>`

#### GET

Take WLAN interface information

##### Response

```json
{
    "interfaces": {
        "wlan0": [
            {
                "addr": "192.168.5.1",
                "broadcast": "192.168.5.255",
                "netmask": "255.255.255.0"
            }
        ]
    }
}
```

#### POST

Connect WLAN interface to access point

##### Request

* `ssid` - access point SSID
* `password` - access point WPA/WPA2 password

##### Response

```json
{
    "interfaces": {
        "wlan1": {
            "connected": true,
            "password": "1234567890",
            "ssid": "myssid"
        }
    }
}
```

### `/api/v1/containers/<iface_id>`

#### GET

Take container status by interface identifier

##### Response

```json
{
    "containers": {"wlan0": {"1231231231": {"status": "running"}}}
}
```

##### POST

Run container for given interface

##### Request

* `image` - Docker image name

##### Response

```json
{
    "containers": {"wlan0": {"1231231231": {"status": "running"}}}
}
```
### `/api/v1/drones/<iface_id>`

#### GET

Take common drone information

##### Response

```json
{
    "drones": {
        "wlan1": {
            "battery": 73,
            "signal": 80,
            "stamp": 33213321
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
        "processor": "Intel(R) Core(TM) i3-3110M CPU @ 2.40GHz",
        "system": "Linux",
        "time": 1488786523.0755541,
        "usage": {
            "cpu": [
                4.0,
                2.0,
                4.0,
                3.0
            ],
            "mem": 27.5
        }
    }
}
```
