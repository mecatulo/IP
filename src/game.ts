import {scene} from "./scene"

/// --- Set up a system ---

const Z_OFFSET = 1.5
const GROUND_HEIGHT = 0.2

let holdingItem = false
let heldItem = ""

scene.batteryRoboter510.addComponent(
    new OnPointerDown(
        () => {
            //
            if(!holdingItem) {
                holdingItem = true
                heldItem = "battery"
                scene.batteryRoboter510.getComponent(Transform).translate(new Vector3(0,-1,0))
            }
            else {

            }
        },
        {
            button: ActionButton.POINTER,
            showFeedback: true,
            hoverText: "pick up",
            distance: 3,
        }
    )
)

scene.roboter511.addComponent(
    new OnPointerDown(
        () => {
            //
            if(holdingItem && heldItem == "battery"){
                heldItem = ""
                holdingItem = false
                //scene.batteryRoboter510.getComponent(Transform).translate(new Vector3(0,1,0))
                scene.roboter511.getComponent(Transform).translate(new Vector3(0,1,0))
                scene.roboter511.getComponent(Transform).rotation = Quaternion.Zero()
            }
            else {

            }
        },
        {
            button: ActionButton.PRIMARY,
            showFeedback: true,
            hoverText: "interact",
            distance: 3,
        }
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