import {scene} from "./scene"

/// --- Set up a system ---

const Z_OFFSET = 1.5
const GROUND_HEIGHT = 2

let holdingItem = false
let heldItem = ""
let poweredUp = false

let originalPosition: Vector3 = Vector3.Zero()
let originalRotation: Quaternion = Quaternion.Zero()

scene.batteryRoboter510.addComponent(
    new OnPointerDown(
        () => {
            //          
            const transform = scene.batteryRoboter510.getComponent(Transform)
            if(!holdingItem) {
                originalPosition = scene.batteryRoboter510.getComponent(Transform).position
                originalRotation = scene.batteryRoboter510.getComponent(Transform).rotation

                holdingItem = true
                heldItem = "battery"
                transform.position = Vector3.Zero()
                transform.rotation = Quaternion.Zero()
                transform.position.z += Z_OFFSET
                scene.batteryRoboter510.setParent(Attachable.AVATAR)
            }
            else if(heldItem == "battery") {
                holdingItem = false
                heldItem = ""
                scene.batteryRoboter510.setParent(null)
                transform.position = Vector3.Zero() //TODO: currently moves battery to zero vector. for some reason it doesn't save the original position or the origian position gets overwritten somehow
                transform.rotation = originalRotation
            }
        },
        { button: ActionButton.POINTER, showFeedback: true, hoverText: "interact", distance: 3 }
    )
)

scene.roboter511.addComponent(
    new OnPointerDown(
        () => {
            //
            if (!poweredUp) {
                if(holdingItem && heldItem == "battery"){
                    heldItem = ""
                    holdingItem = false
                
                    scene.batteryRoboter510.setParent(null)
                    scene.batteryRoboter510.getComponent(Transform).position = Vector3.Zero()

                    scene.roboter511.getComponent(Transform).translate(new Vector3(0,1,0))
                    scene.roboter511.getComponent(Transform).rotation = Quaternion.Zero()
                }
                else {

                }
            }
            else {

            }
        },
        { button: ActionButton.PRIMARY, showFeedback: true, hoverText: "interact", distance: 4 }
    )
)
/*
Input.instance.subscribe('BUTTON_DOWN', ActionButton.POINTER, true, (e) => {
    const transform = scene.batteryRoboter510.getComponent(Transform)
        if(!holdingItem) {
            holdingItem = true

            //calculate held object position relative to camera
            transform.position = Vector3.Zero()
            transform.rotation = Quaternion.Zero()
            transform.position.z += Z_OFFSET
            scene.batteryRoboter510.setParent(Attachable.AVATAR)
        }
        else {
            holdingItem = false

            //calculate held object's ground postion
            scene.batteryRoboter510.setParent(null)
            const forwardVector: Vector3 = Vector3.Forward()
                .scale(Z_OFFSET)
                .rotate(Camera.instance.rotation)
            transform.position = Camera.instance.position.clone().add(forwardVector)
            transform.lookAt(Camera.instance.position)
            transform.rotation.x = 0
            transform.rotation.z = 0
            transform.position.y = GROUND_HEIGHT
        }
    }
)*/


//Markus -----------------------------------------------------------------------------------
//Changes here and copy to scene.ts always / dcl-edit deletes code from scene.ts
import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../door/src/item"
import Script2 from "../lever/src/item"
import Script3 from "../platform/src/item"
import Script4 from "../bluebutton/src/item"

const verticalHallwayDoo = new Entity('verticalHallwayDoo')
engine.addEntity(verticalHallwayDoo)
const transform6 = new Transform({
  position: new Vector3(7.471, 7.463, 26.951),
  rotation: new Quaternion(0, 1, 0, 1),
  scale: new Vector3(1, 1, 1)
})
verticalHallwayDoo.addComponentOrReplace(transform6)

const scifiLeverConsole = new Entity('scifiLeverConsole')
engine.addEntity(scifiLeverConsole)
const transform7 = new Transform({
  position: new Vector3(5.5,  7.463, 26.1),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scifiLeverConsole.addComponentOrReplace(transform7)

const blueLightButton = new Entity('blueLightButton')
engine.addEntity(blueLightButton)
const transform9 = new Transform({
  position: new Vector3(41.3, 12.4, 16.3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
blueLightButton.addComponentOrReplace(transform9)

const verticalPlatform = new Entity('verticalPlatform')
engine.addEntity(verticalPlatform)
const transform20 = new Transform({
  position: new Vector3(41, 0, 25),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform.addComponentOrReplace(transform20)

const verticalPlatform2 = new Entity('verticalPlatform2')
engine.addEntity(verticalPlatform2)
const transform21 = new Transform({
  position: new Vector3(42, 0, 31),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform2.addComponentOrReplace(transform21)

const verticalPlatform3 = new Entity('verticalPlatform3')
engine.addEntity(verticalPlatform3)
const transform24 = new Transform({
  position: new Vector3(43, 0, 37),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform3.addComponentOrReplace(transform24)

const verticalPlatform4 = new Entity('verticalPlatform4')
engine.addEntity(verticalPlatform4)
const transform22 = new Transform({
  position: new Vector3(44,1.5, 43),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform4.addComponentOrReplace(transform22)

const verticalPlatform5 = new Entity('verticalPlatform5')
engine.addEntity(verticalPlatform5)
const transform11 = new Transform({
  position: new Vector3(45, 1.5, 49),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform5.addComponentOrReplace(transform11)

const verticalPlatform6 = new Entity('verticalPlatform6')
engine.addEntity(verticalPlatform6)
const transform12 = new Transform({
  position: new Vector3(46, 1, 55),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform6.addComponentOrReplace(transform12)

const verticalPlatform7 = new Entity('verticalPlatform7')
engine.addEntity(verticalPlatform7)
const transform13 = new Transform({
  position: new Vector3(47, 2, 61),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform7.addComponentOrReplace(transform13)

const verticalPlatform8 = new Entity('verticalPlatform8')
engine.addEntity(verticalPlatform8)
const transform14 = new Transform({
  position: new Vector3(48, 17, 67),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2, 1.2, 1.2)
})
verticalPlatform8.addComponentOrReplace(transform14)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
const script3 = new Script3()
const script4 = new Script4()

script1.init(options)
script2.init(options)
script3.init(options)
script4.init(options)

script1.spawn(verticalHallwayDoo, {"onOpen":[{"entityName":"verticalHallwayDoo","actionId":"open","values":{}}],"onClose":[{"entityName":"verticalHallwayDoo","actionId":"close","values":{}}]}, createChannel(channelId, verticalHallwayDoo, channelBus))
script2.spawn(scifiLeverConsole, {"onActivate":[{"entityName":"verticalHallwayDoo","actionId":"open","values":{}}],"onDeactivate":[{"entityName":"verticalHallwayDoo","actionId":"close","values":{}}]}, createChannel(channelId, scifiLeverConsole, channelBus))
script4.spawn(blueLightButton, {"onClick":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform2","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform3","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform4","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform5","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform6","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform7","actionId":"goToEnd","values":{}},{"entityName":"verticalPlatform8","actionId":"goToEnd","values":{}}]}, createChannel(channelId, blueLightButton, channelBus))

script3.spawn(verticalPlatform, {"distance":9,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform, channelBus))
script3.spawn(verticalPlatform2, {"distance":10,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform2","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform2","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform2, channelBus))
script3.spawn(verticalPlatform3, {"distance":11,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform3","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform3","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform3, channelBus))
script3.spawn(verticalPlatform4, {"distance":10.5,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform4","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform4","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform4, channelBus))
script3.spawn(verticalPlatform5, {"distance":11.5,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform5","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform5","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform5, channelBus))
script3.spawn(verticalPlatform6, {"distance":12.5,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform6","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform6","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform6, channelBus))
script3.spawn(verticalPlatform7, {"distance":12.5,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform7","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform7","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform7, channelBus))
script3.spawn(verticalPlatform8, {"distance":9,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform8","actionId":"goToStart","values":{}}],"onReachStart":[{"entityName":"verticalPlatform8","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform8, channelBus))
