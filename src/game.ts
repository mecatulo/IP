import {scene} from "./scene"

/// --- Set up a system ---

scene.batteryRoboter510.addComponent(
    new OnPointerDown(
        (e) => {
            log("battery clicked", e)
            scene.batteryRoboter510.getComponent(Transform).rotate(Vector3.Up(), 30)
        },
        {
            button: ActionButton.POINTER,
            showFeedback: true,
            hoverText: "rotate",
            distance: 3,
        }
    )
)