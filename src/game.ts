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

const verticalPlatform = new Entity('verticalPlatform')
engine.addEntity(verticalPlatform)
const transform8 = new Transform({
  position: new Vector3(17, 17, 17),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
verticalPlatform.addComponentOrReplace(transform8)

const blueLightButton = new Entity('blueLightButton')
engine.addEntity(blueLightButton)
const transform9 = new Transform({
  position: new Vector3(41.3, 12.4, 16.3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
blueLightButton.addComponentOrReplace(transform9)

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
script3.spawn(verticalPlatform, {"distance":10,"speed":5,"autoStart":false,"onReachEnd":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}}],"onReachStart":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}}]}, createChannel(channelId, verticalPlatform, channelBus))
script4.spawn(blueLightButton, {"onClick":[{"entityName":"verticalPlatform","actionId":"goToEnd","values":{}}]}, createChannel(channelId, blueLightButton, channelBus))