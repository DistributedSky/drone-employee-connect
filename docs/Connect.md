DroneEmployee Connect architecture reference
--------------------------------------------

### 3DR Solo connection scheme

![Structure scheme](https://raw.githubusercontent.com/DroneEmployee/drone-employee-connect/master/docs/architecture.png)

* each drone connected by WiFi to Hardware
* each drone associated by wlan with Docker container

## Multidrone

Any drone handled by *Adapter* container; they gives abstraction
layer over drone type, interfaces, etc.

Multiple *Adapter* instances connected to *Master* container.
Master determines the behaviour of drones based on drone state,
map, tasks and other resources.
