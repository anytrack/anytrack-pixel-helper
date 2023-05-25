import {bootstrap} from "./modules/bootstrap";
import {messageHandler} from "./modules/message-handler";
import {tabChangeHandler} from "./modules/tab-change-handler";
import {webRequestHandler} from "./modules/web-request-handler";
import {instantiateGlobalStore} from "../../global/store";

(async () => {
    await bootstrap()
})()

tabChangeHandler();
(async () => {
    const store = await instantiateGlobalStore();
    webRequestHandler(store)
    messageHandler(store);
})()