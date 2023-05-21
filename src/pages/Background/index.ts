import {bootstrap} from "./modules/bootstrap";
import {messageHandler} from "./modules/message-handler";
import {tabChangeHandler} from "./modules/tab-change-handler";

(async () => {
    await bootstrap()
})()

messageHandler()
tabChangeHandler()