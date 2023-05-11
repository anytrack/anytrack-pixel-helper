import {bootstrap} from "./modules/bootstrap";
import {messageHandler} from "./modules/message-handler";

(async () => {
    await bootstrap()
})()

messageHandler()
