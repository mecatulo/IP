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